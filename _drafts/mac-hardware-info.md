# MAC SYSTEM INFO

`system_profiler`는 macOS에서 시스템 정보를 보고하는 유틸리티입니다.

## 명령어

### 모든 정보

모든 정보가 출력되기 때문에 시간이 다소 소요됩니다.

```shell
system_profiler
```

### 하드웨어 정보

```shell
system_profiler SPHardwareDataType
```

결과

```shell
❯ system_profiler SPHardwareDataType
Hardware:

    Hardware Overview:

      Model Name: Mac mini
      Model Identifier: Macmini6,1
      Processor Name: Dual-Core Intel Core i5
      Processor Speed: 2.5 GHz
      Number of Processors: 1
      Total Number of Cores: 2
      L2 Cache (per Core): 256 KB
      L3 Cache: 3 MB
      Hyper-Threading Technology: Enabled
      Memory: 16 GB
      System Firmware Version: 424.0.0.0.0
      OS Loader Version: 580~439
      SMC Version (system): 2.7f0
      Serial Number (system): ____________  # secret
      Hardware UUID: ________-____-____-____-____________   # secret
      Provisioning UDID: ________-____-____-____-____________   # secret
```

### 옵션

0. **SPHardwareDataType**: 하드웨어 관련 정보를 보여줍니다. 예를 들어, 프로세서, 메모리, 모델 식별자 등의 정보가 포함됩니다.

0. **SPSoftwareDataType**: 운영 체제와 관련된 정보를 보여줍니다. 예를 들어, macOS 버전, 부트 볼륨, 커널 정보 등이 있습니다.

0. **SPNetworkDataType**: 네트워크 설정과 관련된 정보를 보여줍니다. 예를 들어, IP 주소, 라우터 주소, 서브넷 마스크 등의 정보가 포함됩니다.

0. **SPStorageDataType**: 디스크 및 스토리지 정보를 보여줍니다. 예를 들어, 디스크 용량, 사용 가능한 공간, 파일 시스템 등의 정보가 있습니다.

0. **SPMemoryDataType**: RAM에 대한 상세 정보를 보여줍니다.

0. **SPAudioDataType**: 오디오 설정과 디바이스 정보를 보여줍니다.

0. **SPPowerDataType**: 배터리와 전력 관련 정보를 보여줍니다. 노트북 사용자에게 유용합니다.

0. **SPBluetoothDataType**: 블루투스 관련 정보를 보여줍니다.

0. **SPDisplaysDataType**: 연결된 디스플레이와 그래픽 카드에 대한 정보를 보여줍니다.

0. **SPUSBDataType**: USB 포트와 연결된 디바이스 정보를 보여줍니다.

0. **SPThunderboltDataType**: 썬더볼트 포트와 연결된 디바이스 정보를 보여줍니다.

#### 사용 방법

```shell
# 네트워크 정보만 조회
system_profiler SPNetworkDataType
```
