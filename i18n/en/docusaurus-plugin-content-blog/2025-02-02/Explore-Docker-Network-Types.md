---
title: "Docker Network Types"
date: 2025-02-02T21:31
tags: [docker, network, study]
categories: null
authors: haril
description: Exploring various network types available in Docker.
---

## Overview

Docker has six network types in total:

- Bridge
- Host
- IPvlan
- MACvlan
- Overlay
- None

I think many backend developers either don't know much about network types or only use bridge networking even if they do.
I was also curious about this topic and conducted a study. This article is an excerpt from the content I presented during that study.

We'll conduct practical exercises using [Orbstack](https://orbstack.dev/) to run VMs.

<!-- truncate -->

## Docker Network Management

```bash
orb create ubuntu
ssh orb
# Run ip addr show to check network interface configuration
sudo apt install docker.io -y
# Run ip addr show to check network interface configuration, docker0 interface is added
sudo gpasswd -a $USER docker # Add current user to docker group to run without sudo
```

![](https://i.imgur.com/Eu3w1T0.png)

![](https://i.imgur.com/wf6vS1n.png)

The docker0 interface is Docker's default network interface and operates as a bridge.

```bash
# List docker network interfaces
docker network ls
```

## Default Network (bridge)

![](https://i.imgur.com/0m7hPgu.png)

Let's run a service and check the network status again

```bash
docker run -itd --rm --name one busybox
ip addr show
```

![](https://i.imgur.com/B2BuLb0.png)

We can see it's connected to the docker0 interface. Let's run a few more services.

```bash
docker run -itd --rm --name two busybox
docker run -itd --rm --name web nginx
ip addr show
```

![](https://i.imgur.com/KapxOIK.png)

![](https://i.imgur.com/cuV2zBx.png)

Let's first output the IP to test communication between containers.

```bash
# Check IP
docker inspect -f '{{.NetworkSettings.Networks.bridge.IPAddress}}' {container_name}
# 172.17.0.3
```

```bash
docker exec -it one sh
ping google.com
```

Communication with external networks is possible.

```bash
ping 172.17.0.3
# Communication possible
```

We ran nginx earlier. Can we access this nginx? Let's try accessing it through Ubuntu's IP 198.19.249.147.

![](https://i.imgur.com/GfDg2OA.png)

To access the container, ports must be mapped. Let's connect the container port to port 80 of the host machine.

```bash
docker run -itd --rm --name web -p 80:80 nginx
```

![](https://i.imgur.com/souVECS.png)

This is sufficient to deploy and expose a side project externally. However, Docker doesn't recommend using the default network. Instead, they recommend using user-defined networks, which we'll explore next. Why is that?

## User-defined bridge

Creating a user-defined network in Docker is very easy.

```bash
docker network create numbers
```

It's created as bridge type by default.

```bash
ip addr show
```

![](https://i.imgur.com/zxhdBGW.png)

We can see that a virtual network device has been added. The network subnet is assigned 172.18.0.1/16.

Let's add some services and examine the network.

```bash
docker run -itd --rm --name three --network numbers busybox
docker run -itd --rm --name four --network numbers busybox
```

![](https://i.imgur.com/kvd8goV.png)

```bash
docker inspect numbers
```

![](https://i.imgur.com/4A9mUbg.png)

We can check information about containers in the network. Why should we use it this way?

The reason is that it can be completely isolated from the default network. Let's access one and try to ping three.

![](https://i.imgur.com/F9DZ0Q2.png)

Unlike when pinging two, communication is not possible. However, three can still communicate with four.

![](https://i.imgur.com/GCsBQ4F.png)

Network isolation between networks is an extremely important feature.

Secondly, it provides DNS resolve functionality. If containers belong to the same user-defined network, they can communicate using container names instead of IPs.

![](https://i.imgur.com/PfiY7qi.png)

This DNS feature is very convenient because services in container environments can be frequently restarted or deployed. Containers get different IPs each time they're created, and if communication is based on IP rather than DNS, application settings might need frequent changes.

### Reasons to use user-defined network

- Can configure environment isolated from default network
- DNS resolution

## Host

Can we expose container services externally without port mapping?

```bash
docker run -itd --rm --name web --network host nginx
```

Instead of exposing ports, we use the host network. There's no network isolation between the host machine and container, and no virtual interface. Since this container runs as if Docker isn't present, we can directly access services inside the container.

![](https://i.imgur.com/pdGZBr1.png)

Note that security issues may arise as Docker container services are not isolated from the host and are directly exposed to port scanning. We'll skip the dangers of port scanning as we covered it previously with Nmap.

## IPvlan

> IPvlan networks give users total control over both IPv4 and IPv6 addressing. The VLAN driver builds on top of that in giving operators complete control of layer 2 VLAN tagging and even IPvlan L3 routing for users interested in underlay network integration.

Traditionally, containers communicate with external networks using bridges. This works well but adds complexity to network configuration. It also incurs performance penalties due to additional network hops.

![](https://i.imgur.com/fr7JZI8.png)

IPvlan is a network virtualization technique. It provides users complete control over IPv4 and IPv6 addressing. Instead of using bridges for network isolation, it enables very lightweight network configuration by connecting directly to host network equipment. Therefore, port mapping is not needed.

- High-performance networking
- Security isolation

```bash
docker network create -d ipvlan \
    --subnet=198.19.249.0/24 \
    --gateway=198.19.249.1 \
    -o ipvlan_mode=l2 \
    -o parent=eth0 my-ipvlan-net
```

```bash
docker run -itd --rm --name web --network my-ipvlan-net nginx
```

![](https://i.imgur.com/kdKrXYx.png)

_Does not create a network interface._

You can see the nginx page by accessing 198.19.249.2.

## MACvlan

> Macvlan networks allow you to assign a MAC address to a container, making it appear as a physical device on your network. The Docker daemon routes traffic to containers by their MAC addresses. Using the `macvlan` driver is sometimes the best choice when dealing with legacy applications that expect to be directly connected to the physical network, rather than routed through the Docker host's network stack.

![](https://i.imgur.com/PV3WpG8.png)

Using MACvlan, you can assign MAC addresses to containers, making them appear as physical devices on your network. The Docker daemon routes traffic to containers based on MAC addresses. This can be helpful when dealing with legacy applications that expect to be directly connected to the physical network rather than being routed through the Docker host's network stack.

Let's take an example. Say you're setting up a web service and want to download and use large files. The files could be hundreds of gigabytes, but you're using just one server.

If the server has only one network card, problems could arise. This is because it can use too many resources. And if communicating at 1Gbps, this task would take a very long time, and therefore the web service you provide would always be slow.

Therefore, you should configure it to look at all four interfaces. At this time, the MAC addresses must all be set differently. The technology that makes this possible is macvlan.

```bash
docker network create -d macvlan \
    --subnet=192.168.1.0/24 \
    --gateway=192.168.1.1 \
    -o parent=eth0 macvlan_net
```

- `-d macvlan`: Creates a network using the Macvlan driver
- `--subnet`: Specifies the network's subnet
- `--gateway`: Specifies the default gateway
- `-o parent`: Specifies the host's actual network interface (here, `eth0`)

```bash
docker run -itd --rm --network macvlan_net --name five busybox
```

```bash
docker exec -it five sh
ip addr
# You can see that the mac address is different from the host
```

### mode

- bridge: Default mode. Containers can communicate with each other and external networks. Direct communication with the host is not possible, but you can communicate by adding a separate macvlan interface to the host
- 802.1q: Separates networks through vlan tagging. Useful in multi-tenant environments. Can assign separate subnets for each vlan 