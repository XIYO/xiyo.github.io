# INSTALL SSH SERVER

윈도우즈에서 *SSH* 서버를 설치하는 방법을 알아봅니다.

*SSH* 클라이언트는 윈도우즈 10부터 설치되어 있습니다.

## PREREQUISITES

- 윈도우즈 서버 2019 또는 윈도우 10 (build 1809) 이상
- 파워셸 5.1 이상
- 관리자 계정

## INSTALL

0. 파워셸을 관리자 권한으로 실행
0. *SSH* 서버 설치

    *명령어* :

    ```powershell
    Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0    
    ```

    *출력* :

    ```powershell
    Path          :
    Online        : True
    RestartNeeded : False
    ```

    성공적으로 설치되면 *Online* 이 *True* 로 나타납니다.

## RUN

*SSH* 서버 실행

- 실행

    단독으로 실행하는 방법입니다.

    *명령어* :

    ```powershell
    Start-Service sshd
    ```

    *출력* 없음

- 서비스 자동 실행

    윈도우즈 부팅시 자동으로 실행되도록 설정합니다. 

    *명령어* :

    ```powershell
    Set-Service -Name sshd -StartupType 'Automatic'
    ```

    *출력* 없음

- 방화벽 허용

    방화벽에서 *SSH* 서버가 사용하는 22번 포트의 접근을 허용합니다.

    *명령어* :

    ```powershell
    if (!(Get-NetFirewallRule -Name "OpenSSH-Server-In-TCP" -ErrorAction SilentlyContinue | Select-Object Name, Enabled)) {
        Write-Output "Firewall Rule 'OpenSSH-Server-In-TCP' does not exist, creating it..."
        New-NetFirewallRule -Name 'OpenSSH-Server-In-TCP' -DisplayName 'OpenSSH Server (sshd)' -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22
    } else {
        Write-Output "Firewall rule 'OpenSSH-Server-In-TCP' has been created and exists."
    }
    ```

## CHECK

- *SSH* 서버 상태 확인

    실제 서비스가 실행되고 있는지 확인합니다.

    *명령어* :

    ```powershell
    Get-Service -Name 'sshd'
    ```

    *출력* :

    ```text
    Status   Name               DisplayName
    ------   ----               -----------
    Running  sshd               OpenSSH SSH Server
    ```

    *Status* 가 *Running* 이면 정상적으로 실행된 것입니다. \
    *Status* 가 *Stopped* 이면 *Start-Service sshd* 명령어 실행 후 다시 확인합니다.

- 접속 확인

    - 내 계정 확인

        윈도우즈 설치 초기에 마이크로소프트 계정으로 생성했으면 메일의 아이디가 계정 이름입니다. \
        5자를 초과하는 아이디에 대해서는 변경하기 때문에 정확히 확인 합니다.

        *명령어* :

        ```powershell
        Write-Output $env:UserName
        ```

        *출력* :

        ```text
        xiyo
        ```

        실제 시스템 계정 이름이 출력됩니다.

    - 로컬 *SSH* 접속

        *명령어* :

        ```powershell
        ssh xiyo@localhost
        ```

        xiyo 자신의 계정으로 바꾸면 됩니다.

        *출력* :

        ```text
        he authenticity of host '127.0.0.1 (127.0.0.1)' can't be established.      
        ECDSA key fingerprint is SHA256:D/StxC2FjSpxjD9X+QcXyhHJHb0tfC+Hn9iFMbZooTM.
        Are you sure you want to continue connecting (yes/no/[fingerprint])? 
        ```

        최초 접속시 접속 정보를 저장합니다. \
        *yes* 를 입력하고 엔터를 누릅니다.

        이어서 패스워드를 물어봅니다.

        *출력* :

        ```text
        xiyo@127.0.0.1's password: 
        ```

        패드워드 입력시 화면에는 아무것도 나타나지 않습니다. \
        패스워드를 입력하고 엔터를 누릅니다.

        성공적으로 접속시 새로운 명령 프롬프트가 나타납니다.

    - 외부 *SSH* 접속

        외부 접속은 호스트의 IP 주소를 바꾸고 실행하면 됩니다.

        *명령어* :

        ```powershell
        ssh xiyo@192.168.0.10
        ```

        로컬 접속과 시나리오는 같습니다.

## TROUBLESHOOTING

### 외부에서 접속이 안될 때

로컬에서 접속을 성공했는데 외부에서 접속이 안 된다면 여러가지 상황이 있습니다.

#### 방화벽 차단

네트워크 어딘가에서 방화벽이 *SSH* 접속을 차단하고 있습니다.

*출력* :

```text
ssh: connect to host 192.168.1.10 port 22: Connection refused
```

22번 포트가 외부에서 접근이 차단되어 있습니다.

모든 방화벽을 비활성화하고 서버에서 부터 라우터까지 차례로 활성화하면서 테스트 합니다.

#### 호스트 연결 불가

*192.168.1.10*을 입력하다가 실수로 *0*을 하나더 입력한 상황입니다.

*출력* :

```text
ssh: connect to host 192.168.1.100 port 22: Network is unreachable
```

네트워크에서 찾을 수 없는 IP 주소 입니다.

IP 주소를 확인하고 다시 시도합니다.

#### 호스트 연결 시간 초과

*192.168.1.10*이 아닌 *192.168.**2**.10*으로 다른 네트워크 대역으로 접속하는 상황입니다.

*출력* :

```text
ssh: connect to host 192.168.2.10 port 22: Operation timed out
```

네트워크 대역이 달라서 아무런 응답이 없습니다.

IP 주소를 확인하고 다시 시도합니다.
