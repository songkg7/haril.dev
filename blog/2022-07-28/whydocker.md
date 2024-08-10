---
title: "Why Docker?"
date: 2022-07-28 19:29:00 +0900
tags: [Infra, docker]
categories: [DevOps]
authors: haril
---

:::info

이 글은 사내 정보 공유를 위해 작성되었기 때문에 Java 개발환경을 기준으로 설명합니다.

:::

## Docker 는 무엇일까?

Docker
: Linux 컨테이너를 만들고 사용할 수 있도록 하는 컨테이너화 기술, 그리고 그 기술을 지원하는 가장 큰 회사의 이름이자 오픈소스 프로젝트의 이름

![deploy-history](./deploy-history.webp)
_누구나 docker 에 대해 검색하면 한번쯤 봤을 그 그림_

2013년에 등장한 돜는 인프라 세계를 컨테이너 세상으로 바꿔버렸다. 수많은 애플리케이션이 컨테이너로 배포하고 도커파일을 만들어 이미지를 빌드하고 컨테이너를 배포하는게 흔한 개발 프로세스가 되었다. 2019년 DockerCon 발표에선 무려 1052억번의 컨테이너 image pull 이 발생했다고 한다.

Docker 를 사용하면 컨테이너를 매우 가벼운 모듈식 가상머신처럼 다룰 수 있다. 또한 컨테이너를 구축, 배포, 복사하고 한 환경에서 다른 환경으로 이동하는 등 유연하게 사용할 수 있어서 애플리케이션을 클라우드에 최적화하도록 지원한다.

<!-- truncate -->

## 도커 컨테이너의 이점

### 어디서나 동일한 동작을 보장

컨테이너 런타임만 설치되어 있다면 도커 컨테이너는 어디에서든 같은 동작을 보장한다. 예를 들면 WindowOS를 사용하는 팀원A 와  MacOS 를 사용하는 팀원B 는 서로 다른 OS 위에서 작업을 하고 있지만, 도커파일을 통한 이미지를 공유하기만 한다면 OS 에 구애받지 않고 같은 결과를 볼 수 있을 것이다. 배포 또한 마찬가지이다. 이미 컨테이너를 통해 정상 결과를 확인했다면, 어디에서 컨테이너를 실행하더라도 별도의 설정없이 정상 동작할 것이다.

### 모듈성

Docker 의 컨테이너화 접근 방식은 전체 애플리케이션을 분해할 필요없이 애플리케이션의 일부를 분해하고, 업데이트 또는 복구하는 능력에 집중되어 있다. 사용자는 이 마이크로서비스 기반 접근 방식 외에도 SOA(service-oriented architecture)의 작동 방식과 동일하게 멀티플 애플리케이션 사이에 프로세스를 공유할 수 있다.

### 계층 및 이미지 버전 제어

각 Docker 이미지 파일은 일련의 계층으로 이루어져있으며 이 계층들은 단일 이미지로 결합된다.

Docker 는 새로운 컨테이너를 구축(Build)할 때 이러한 계층을 재사용하므로 Build 가 훨씬 빨라진다. 중간 변경사항이 이미지 사이에서 공유되므로 속도, 규모, 효율성이 더 개선된다.

### 신속한 배포

Docker 기반 컨테이너는 배포 시간을 몇 초로 단축할 수 있다. 또한 컨테이너를 추가하거나 이동하기 위해 OS 를 부팅할 필요가 없으므로 배포 시간이 크게 단축된다. 이 뿐만 아니라 배포 속도가 빨라 컨테이너에서 생성된 데이터를 비용효율적으로 쉽게 생성하고 삭제할 수 있고 사용자는 제대로 생성 혹은 삭제되었는지 우려할 필요가 없다.

즉, **Docker 기술은 효율성을 중시하며 더 세분화되고 제어 가능한 마이크로서비스 기반 접근 방식**이다.

### 롤백

도커로 배포할 경우 사용하는 이미지는 tag 를 사용한다. 예를 들어 1.2 버전의 이미지를 사용하여 배포하였을 때, 1.1 버전의 이미지가 저장소에 있으므로 사용자는 jar 파일을 다시 준비할 필요없이 run 명령만 실행하면 된다.

```bash
docker run --name app image:1.2
docker stop app

## 1.1 버전을 실행
docker run --name app image:1.1
```

## 도커를 사용하기 전과 후로 비교해보기

도커 컨테이너를 사용하면 기존 배포방식에 비하여 훨씬 빠르고 유연한 배포가 가능해진다.

### 도커 컨테이너를 사용하지 않는 배포

1. 로컬 머신에서 배포할 `jar` 파일을 패키징하여 준비한다.
2. `scp` 등 파일 전송 프로토콜을 사용하여 운영 서버로 `jar` 파일을 전송한다.
3. status 관리를 위해 `systemctl` 등을 사용하여 service 파일을 작성한다.
4. `systemctl start app` 으로 application 을 실행한다.

만약 하나의 서버에서 여러개의 앱을 실행 중일 경우는 중지된 앱을 찾는 과정 등 복잡성이 매우 크게 증가한다. 여러 서버에서 여러 앱을 실행 중일 경우에도 별반 다르지 않으며 서버를 이동하며 명령어를 쳐야해서 더욱 피곤한 과정을 거쳐야 한다.

### 도커 컨테이너를 사용한 배포

1. `Dockerfile` 을 사용하여 application 을 이미지화한다. → Build ⚒️
2. Dockerhub, gitlab registry 등 저장소에 image를 `push` 한다. → Shipping🚢
3. 운영 서버에서 `docker run image` 을 실행하여 application 을 실행한다.

복잡한 경로 설정 및 파일 전송과정에서 시간을 낭비할 필요가 없으며, 도커는 환경을 가리지 않으므로 어디서나 실행이 보장되어 자원을 효율적으로 사용하게 된다.

Docker 는 단일 컨테이너 관리에 적합하도록 만들어져 있다. 수백 개로 세분화된 컨테이너와 컨테이너화된 앱을 점점 더 많이 사용하기 시작하면 관리와 오케스트레이션이 매우 어려워질 수 있다. 결국 모든 컨테이너 전체에서 네트워킹, 보안, 텔레메트리와 같은 서비스를 제공하기 위해서는 한 걸음 물러나서 컨테이너를 그룹화해야한다. 바로 여기에 쿠버네티스[^footnote]가 사용된다.

## 언제 써야할까?

분야를 가리지 않고 개발자라면 거의 모든 상황에서 도커를 매우 유용하게 사용할 수 있다. 사실 개발 및 배포, 운영을 포함한 모든 프로세스에서 일반적인 방법보다 도커가 더 우월한 경우가 많으므로 도커 컨테이너는 항상 1순위로 고려되야 한다고 생각한다.

1. PostgreSQL 등 로컬머신에 개발용 DB 가 필요한 경우
2. 새로운 기술을 테스트해보거나 간단하게 도입해보고 싶은 경우
3. 설치나 삭제 과정이 까다로운 소프트웨어 등 로컬 머신에 직접 설치하기 부담스러운 경우 (ex. Java는 윈도우에서 재설치하기가 아주 끔찍하다)
4. Front-end 등 다른 팀의 최신 배포 버전을 로컬에서 실행시켜보고 싶은 경우
5. 운영 서버를 NCP 에서 AWS 로 바꿔야하는 경우

## Example

간단한 API server

```bash
docker run --name rest-server -p 80:8080 songkg7/rest-server
```

```bash
# curl 사용시
curl http://localhost/ping

# httpie 사용시
http localhost/ping
```

80 port 를 container 의 8080 port 와 매핑했기 때문에 컨테이너와 잘 통신되는 것을 볼 수 있다.

:::tip

> **자주 사용하는 docker run options**
>
> `--name`
> : Assign a name to the container
>
> `-p`
> : publish a container's port(s) to the host
>
> `--rm`
> : Automatically remove the container when it exits
>
> `-i`
> : interactive, Keep STDIN open even if not attached 입출력 기능을 허용
>
> `-t`
> : tty, Allocate a pseudo-TTY, 터미널과 비슷한 환경을 생성
>
> `-v`
> : Bind mount a volume

:::

## Conclusion

도커 컨테이너를 사용하면 전통적인 배포 방식에서 발생하는 문제를 해결하면서 편리한 운영을 가능하게 한다. 다음은 애플리케이션을 이미지로 만들어주는 `Dockerfile` 에 대해 알아본다.

## Reference

- [Redhat - Docker(도커) 란?](https://www.redhat.com/ko/topics/containers/what-is-docker)

---

[^footnote]: [kubernetes](https://haril.dev/blog/2022/07/22/kubernetes-start)
