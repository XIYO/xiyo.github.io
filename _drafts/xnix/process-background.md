# BACKGROUND PROCESS EXCUTION

유닉스 계열의 OS에서 백그라운드로 프로세스를 실행하는 방법을 소개하겠습니다.

## `ctrl` + `z`

가장 간단한 방법은 `잡 컨트롤`로,  
`포어 그라운드`에서 실행중인 프로세스를 `ctrl` + `z`를 눌러,  
__프로세스를 일시 중지 시키면서 백그라운드로 보냅니다.__

백그라운드로 보낸 프로세스는 `jobs` 명령어로 확인할 수 있습니다.

`fg` 명령어로 백그라운드로 보낸 프로세스를 포어그라운드로 다시 가져올 수 있습니다.

> ℹ️ Note
>
> `ctrl` + `z`는 사용자의 의한 정지 시그널,  `SIGTSTP`을 프로세스에 보냅니다.  
> 프로세스는 `SIGTSTP` 시그널을 무시할 수 있습니다.  
> 시그널이 무시되지 않는다면 프로세스는 `suspend` 상태가 됩니다.
> 무시 된다면 프로세스는 계속 실행됩니다.

### USAGE

```shell
[COMMAND]
```

`ctrl` + `z` 로 프로세스를 백그라운드로 보냅니다.

### EXAMPLE

[![asciicast](https://asciinema.xiyo.dev/a/16.svg)](https://asciinema.xiyo.dev/a/16)

## &

`&`(Ampersand, 앰퍼샌드)는 명령어 뒤에 붙여서 사용하여,  
__프로세스를 실행 상태로 백그라운드로 보냅니다.__

쉘의 제어할 수 있지만,
__프로세스의 표준 출력 스트림은 현재 쉘에 그대로 출력됩니다.__

쉘에 종속적으로 실행되기 때문에,  
현재 쉘을 종료하면 프로세스에 `SIGHUP` 시그널이 전달되어 프로세스가 종료됩니다.

> ℹ️ Note
>
> `SIGHUP`은 "Signal Hang Up"의 약자입니다.  
> 프로세스를 종료하는 시그널입니다.

### USAGE

명령어의 끝에 공백과 함께 `&`를 붙여서 사용합니다.

```shell
[COMMAND] &
```

### EXAMPLE

```shell
bash -c 'for i in {1..5}; do sleep 5; echo "hi $i";  done' &
```

1초에 한번씩 `hi`를 출력하는 프로세스를 백그라운드로 실행합니다.

[![asciicast](https://asciinema.xiyo.dev/a/18.svg)](https://asciinema.xiyo.dev/a/18)

## NOHUP

`nohup`(노업)은 현재 쉘을 종료해도 프로세스에 `SIGHUP` 시그널을 보내지 않는,  
__프로세스를 실행합니다.__  
포어그라운드에서 실행하기 때문에 단독으로 사용하지 않고,
__`&`와 함께 사용합니다.__

실행 하는 위치에서 `nohup.out` 파일이 생성되며,  
__표준 출력 스트림이 `nohup.out`에 기록 됩니다.__  
출력을 저장할 필요가 없다면 `/dev/null`로 리다이렉트 하는것이 좋습니다.
`nohup.out` 파일이 이미 존재한다면, 기존 내용은 사라집니다.

> ℹ️ Note
>
> `nohup`은 "No Hang Up"의 약자입니다.

### USAGE

```shell
nohup [COMMAND]
```

포어그라운드에서 실행합니다. 터미널을 종료해도 프로세스가 종료되지 않습니다.

OR

```shell
nohup [COMMAND] &
```

백그라운드에서 실행합니다. 터미널을 종료해도 프로세스가 종료되지 않습니다.

### EXAMPLE

