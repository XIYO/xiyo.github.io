# PROCESS BACKGROUND RUN

프로세스를 백그라운드로 실행시키는 여러가지 방법을 소개하겠습니다.

## & (Ampersand)

`&`(Ampersand, 앰퍼샌드)는 쉘에서 프로세스를 백그라운드로 실행시키는 명령어입니다.  

`&`를 사용하여 프로세스를 실행하면 프로세스는 부모 쉘에 종속적으로 실행됩니다.  
터미널을 종료하면서 부모 쉘을 종료하는 경우 `&` 로 실행했던 프로세스에 `SIGHUP` 시그널이 전달되어 프로세스가 종료됩니다.

> Note
>
> "Signal Hang Up"의 약자입니다. 프로세스에게 터미널이 끊어졌음을 알리는 시그널입니다.

### USAGE

```bash
[명령어] &
```

### EXAMPLE

```bash
python3 -m http.server 8080 &
```

## nohup

`nohup`은 "No Hang Up"의 약자로, 쉘 세션에서 로그아웃 했을 때나 쉘을 닫았을 때도 백그라운드에서 프로세스를 계속 실행하도록 도와주는 유닉스와 리눅스 명령어입니다.

### USAGE

```bash
nohup [명령어] &
```

### EXAMPLE

```bash
nohup python3 -m http.server 8080 &
```