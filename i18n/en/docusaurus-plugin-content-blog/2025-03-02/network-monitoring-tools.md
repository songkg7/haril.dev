---
title: "Tools for Network Monitoring"
date: 2025-03-02T20:32
tags: [tool, network, k6, ngrinder, jmeter, locust]
categories: null
authors: haril
image: https://i.imgur.com/LuUWLuZ.png
description: Exploring various tools that can be used for network debugging.
---

![banner](https://i.imgur.com/LuUWLuZ.png)

## Overview

This is a brief session prepared for those who don't know where to start with their presentations. We'll introduce various tools that can be used for network monitoring and experimentation, along with explanations of how to use them.

## Environment

What kind of environment should we prepare to study networking? While it depends on the topic you want to study, let's look at some commonly used methods.

<!-- truncate -->

### 1. Creating EC2 Instance with Public IP

#### Pros

- Most common method
- Most accurate testing possible as it's physically separate from the local environment

#### Cons

- Need to be mindful of resource cleanup as it's paid
- Requires understanding of infrastructure for network configuration

### 2. Running Specific OS Container with Docker

#### Pros

- Easy setup if docker is installed
- Free

#### Cons

- Not a great experience having to access containers directly through docker exec
- Running different OS in docker container isn't really aligned with container purposes
- Not completely isolated testing as it borrows host machine resources

### 3. VM

#### Pros

- Useful when needing to use different OS from host machine
- Can configure physically separated environment

#### Cons

- Complex setup for using VM on Mac
- Requires significant resources to run separate OS

## Performance Testing Tools

### Apache Bench

[ab - Apache HTTP server benchmarking tool - Apache HTTP Server Version 2.4](https://httpd.apache.org/docs/2.4/programs/ab.html)

A very simple benchmark tool that can be used via terminal

### K6

[Load testing for engineering teams \| Grafana k6](https://k6.io/)

A performance testing tool created by Grafana Labs. Supports modern interface, usage methods, and various use cases.

I used K6 in [this article](https://haril.dev/blog/2023/11/10/Spring-MVC-Traffic-Testing) as well. **Generally, K6 is most recommended if you need performance testing**

### nGrinder

[nGrinder](https://naver.github.io/ngrinder/)

A performance testing tool created by Naver. Advantageous for distributed environment testing. Has many use cases and excellent accessibility for Korean developers due to abundant Korean documentation.

### JMeter

[Apache JMeter - Apache JMeter™](https://jmeter.apache.org/)

### Locust

[Locust - A modern load testing framework](https://locust.io/)

A performance testing tool written in Python. Could have advantages over other tools if your environment is Python-specialized.

## Traditional Network Monitoring Tools

- Network monitoring tools are required to compare results for network-related experiments

### `lsof`

```bash
lsof path/to/file # List processes that have opened the file
lsof -i :8080 # List processes opened through local internet port
lsof -p PID # List files opened by given PID
```

- lsof = Lists open files
- Command that shows which files are opened by which processes = can check file descriptors
- A command you've probably used at least once when seeing a port already in use error while developing applications
- Most commonly used with kill command to force quit IntelliJ occupying port 8080...

### `ifconfig`

```bash
ifconfig
```

- Basic command for checking network equipment
- Included in [net-tools](https://github.com/giftnuss/net-tools)

### `netstat`

- Tool used to display network connections, routing tables, and network interface statistics

```bash
netstat -p tcp -van
```

## Modern Network Monitoring Tools

### Somewhat Outdated Net-tools

- Quite old net-tools = **about 26 years**
- **Last commit was 14 years ago**
- New commands from iproute2 project are used recently
- net-tools no longer included from ubuntu 18.04
- On mac, you can use new tools with `brew install iproute2mac` command

### `ip`

Command replacing ifconfig

```bash
ip address show # Network interface information
ip route show # Routing elements
ip neighbor show # Known hosts registered in ARP table = included in sub-network
```

### `ss`

- Utility for checking socket status
- Improved version of netstat
- Recent Linux distributions recommend ss over netstat

```bash
ss -a # Show all sockets
ss -t # Show TCP sockets
ss -u # Show UDP sockets
ss -lt src :80 # Show listening sockets on port 80
```

### Bandwhich

- Network bandwidth monitoring tool
- Can monitor what requests are coming and going in real-time

```bash
bandwhich
```

## Practice

The goal is to quickly run an nginx server and check if it can be used for network testing purposes.

- Using Orbstack for VM creation
- orbstack provides convenient features for handling VMs

First, create an ubuntu machine

```bash
orb create ubuntu
```

Check if the virtual machine was created properly

```bash
orb list
```

Access the newly created virtual machine via ssh

```bash
ssh orb
# or
ssh machine@orb
```

Check the architecture of the currently connected virtual machine

```bash
uname -a
arch
```

Preparation complete.

Install NginX for simple network request testing

```bash
sudo apt update
sudo apt install nginx
```

Let's access localhost or http://ubuntu.orb.local/

![](https://i.imgur.com/2OAjyz9.png)

You can monitor TCP connections being created with the following command:

```bash
watch ss -taonp
```

When sending requests with curl or httpie, it immediately changes to time_wait state. This is because there's an internal mechanism that immediately closes the connection when receiving a response to the request.

![](https://i.imgur.com/ftNEOoK.png)

![](https://i.imgur.com/XO1oqk9.png)

## Conclusion

We've looked at methods and tools available for monitoring network status. Each tool has different specialized areas and various uses, so knowing multiple tools will be advantageous for debugging. You don't need to know all tools in detail - it's sufficient to have a general awareness like "oh, these things exist" and then look into them in detail when needed.

## Reference

- https://www.lesstif.com/lpt/linux-socket-ss-socket-statistics-91947283.html
- https://awesometic.tistory.com/125 