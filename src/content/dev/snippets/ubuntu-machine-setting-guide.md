---
title: "Ubuntu Machine Setting Guide"
date: "2021-11-24"
draft: false
path: "/blog/snippets/ubuntu-machine-setting-guide/"
---

Dell Server를 셋팅하면서 참조한 문서들 정리
Ubuntu 21 기준

## Packages
```bash
# get list installed packages
apt list --installed
```

## IP 설정
https://www.howtoforge.com/linux-basics-set-a-static-ip-on-ubuntu

```bash
sudo vi /etc/netplan/00-installer-config.yaml
```

아래의 설정을 참고로 셋팅
```yaml
# This file describes the network interfaces available on your system
# For more information, see netplan(5).
network:
  version: 2
  renderer: networkd
  ethernets:
    ens33:
      dhcp4: no
      dhcp6: no
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8]
```

셋팅 후 아래 명령어로 적용
```bash
sudo netplan apply
```

확인
```bash
hostname -I
```

## users && groups
https://www.howtogeek.com/447906/how-to-control-sudo-access-on-linux/
https://www.howtogeek.com/50787/add-a-user-to-a-group-or-second-group-on-linux/
https://www.digitalocean.com/community/tutorials/how-to-edit-the-sudoers-file
https://www.liquidweb.com/kb/add-user-grant-root-privileges-ubuntu-18-04/

```bash
# check my groups
groups

# show user's group
groups exapmpleuser

# Add a new Group
sudo groupadd mynewgroup

# Add an Exisiting User Account to a Group
usermod -a -G examplegroup exampleusername
usermod -aG examplegroup exampleusername

# Docker command without sudo
usermod -aG docker $USER

# Change a User's Primary Group
usermod -g groupname username

# Create a New User and Assign a Group in One Command
useradd -G examplegroup exampleusername

# edit User Privileges
sudo EDITOR=vim visudo

# Listing All Groups
less /etc/group

# delete user from group
# 유저를 삭제하거나 그룹이 삭제하는 것은 아니고 오직 관계만 끊는 것이다.
deluser <username> <groupname>

# Add user
sudo adduser <username>
# delete user
sudo deluser <username>
# list all user
less /etc/passwd
# display only username
getent passwd | awk -F: '{ print $1}'

#############################################################
# https://www.baeldung.com/linux/change-default-home-directory

# Add user with set home directory
sudo useradd -m -d /home/baeldung baeldung
# changing the home directory
sudo usermod -d /usr/baeldung baeldung
```



## zsh, oh-my-zsh
https://www.tecmint.com/install-oh-my-zsh-in-ubuntu/

```bash
# install basic packages
sudo apt install -y curl wget git zsh

# install oh-my-zsh
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

# install oh-my-zsh plugins
git clone https://github.com/zsh-users/zsh-autosuggestions.git $ZSH_CUSTOM/plugins/zsh-autosuggestions
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git $ZSH_CUSTOM/plugins/zsh-syntax-highlighting

# add plugins to .zshrc
vi ~/.zshrc

# plugins 라인을 찾은 뒤 (git zsh-autosuggestions zsh-syntax-highlighting) 과 같이 설정해주면 된다.


# change default shell to zsh
chsh -s $(which zsh)
```

## docker
ubuntu 인스톨 시 docker를 바로 설치할 수 있다.

https://github.com/sindresorhus/guides/blob/main/docker-without-sudo.md

```bash
# 도커 상태 확인
sudo snap status docker
# 도커 리스타트
sudo snap restart docker

# sudo 없이 docker 명령어 사용하기
sudo groupadd docker

usermod -aG docker $USER

#  - 머신을 재부팅해야 적용된다.
sudo reboot now
```

## Increase Maximum open files
https://askubuntu.com/questions/1049058/how-to-increase-max-open-files-limit-on-ubuntu-18-04

FE 개발을 하다보면 더 이상 파일을 열 수 없다는 에러를 자주 보는데 이를 해결하는 방법이다.

```bash
vi /etc/systemd/system.conf
```

## disk usage

```bash
df -h
```

`DefaultLimitNOFILE=65534`로 설정한 후 맨 앞에 있는 `#`문자를 제거해주면 된다.
그리고 나서 머신 재부팅

```bash
sudo reboot now
```

## Timezone

```bash
timedatectl set-timezone 'Asia/Seoul'

# 전체 목록
timedatectl list-timezones
```

## SSH login without password
클라이언트에서 아래 명령어를 수행한다. 이미 만들어져 있다면 하지 않아도 된다.

```bash
# 이미 수행했다면 하지 않아도 된다.
ssh-keygen

# port가 필요 없다면 빼도 된다.
ssh-copy-id "user@host -p 1234"
```

## Mongodb

```bash

# start mongo
sudo systemctl start mongod

# check status
sudo systemctl status mongod

# stop mongo
sudo service mongod stop

# restart mongo
sudo service mongod restart

# completely remove mongodb
sudo apt-get purge 'mongodb*'

# remove data
sudo rm -r /var/log/mongodb
sudo rm -r /var/lib/mongodb
```

/etc/mongod.conf에서 접속 ip및 포트를 수정할 수 있다.
변경 후에는 mongo service를 재시작해줘야 한다.

## MariaDb

```bash
sudo apt install mariadb-server

```

유저와 권한 부여는 다음과 같이 한다.
`*.*`은 모든 db에 접근하도록 하겠다는 의미이고
root 뒤에 오는 ip는 해당 소스로부터의 접속을 허용하겠다는 의미이다.
모든 소스 ip에 대해 허용하려면 `%`를 사용하면 된다.

```sql
GRANT ALL PRIVILEGES ON *.* TO 'root'@'192.168.100.%'
  IDENTIFIED BY 'my-new-password' WITH GRANT OPTION;
```

반영된 것은 아래와 같이 사용할 수 있다.
```sql
SELECT Host, User FROM mysql.user WHERE Host <> 'localhost';
```

모든 ip에 대해 접속을 허용하려면 다음과 같이 해야 한다.
```bash
#####
# 1. ip 추가
vi /etc/mysql.my.cnf
# 2. 내용 추가
[mysqld]
bind-address=0.0.0.0
```

## Conda

https://www.anaconda.com/products/individual

위의 링크에서 원하는 version의 다운로드 링크를 복사한뒤 아래 명령어를 수행한다.

```bash
cd /tmp

curl -O https://repo.anaconda.com/archive/Anaconda3-2021.11-Linux-x86_64.sh
```
설치 후 재접속하면 된다.


## nvm
https://github.com/nvm-sh/nvm

위의 링크에 적힌대로 아래 명령어를 수행하면 된다.

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

인스톨 후 ssh 재 로그인을 해야 사용 가능하다.

만약 `nvm` 이 실행 안된다면 사용하고 있는 shell에 아래 코드가 들어있는지 확인해야 한다.

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

nvm이 정상 동작했다면 아래와 같은 명령어들을 사용 가능하다.

```bash
nvm install --lts

nvm ls
```

# nginx

아래의 명령어로 설정 파일들에 오류가 없는지를 알 수 있다.
```bash
sudo nginx -t
```

`sudo apt-get install nginx`를 이용해 패키지를 설치하면 기본 설정 파일들이 `/etc/nginx` 폴더에 설치된다.

nginx가 바라보는 설정 파일은 `nginx.conf`로 설정을 추가하고 서비스를 재시작하면 내용이 적용된다.

내용을 보면 아래와 같이 Virtual Host Configs 부분이 있고

```bash
include /etc/nginx/sites-enabled/*;
```

폴더를 찾아가면 default라는 파일이 있다.
이 파일을 복사해 원하는 셋팅을 추가하면 nginx에 적용할 수 있다.
간단하게는 아래와 같이 쓸 수 있다.

```bash
server {
  listen 1234;
  server_name 123.456.789.123;

  location / {
    root   /my-folders/public;
    index  index.html index.htm;
    try_files $uri /index.html;
  }
}
```

참고로 server_name을 다르게 설정하면 상이한 domain name에 동일한 서버를 적용할 수 있다.
예를 들어 `www.example.com`과 `www.helloworld.com`이라는 Domain Name에 `123.456.789.123`이라는 서버를 연결하고 각기 다른 서비스를 제공하고 싶다면 위와 같은 내용으로 두 개의 파일을 만든 뒤 각 server_name에 원하는 domain name을 적어주면 적용된다.

```bash
# www.example.com
server {
  listen 80;
  server_name www.example.com;
  ...
}
```

```bash
# www.hello-world.com
server {
  listen 80;
  server_name www.helloworld.com;
  ...
}
```

## Tips
### ubuntu에서 ssh permissions are too open error 발생 시
https://stackoverflow.com/questions/9270734/ssh-permissions-are-too-open-error

Keys need to be only readable by you:

> chmod 400 ~/.ssh/id_rsa

If Keys need to be read-writable by you:

> chmod 600 ~/.ssh/id_rsa