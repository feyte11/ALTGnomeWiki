# Hasher

haher - инструмент для сборки пакетов в «чистой» и контролируемой среде.

***Статья составлена с учётом наставлений Hihin Ruslan (ALT Linux Team)***

## Подготовка локальной сборочницы

Первым делом, что необходимо сделать, это установить необходимые пакеты из репозитория, для этого открываем терминал и выполняем установку.

```
su -
apt-get update
apt-get install gcc rpm-build rpmlint make python gear hasher patch rpmdevtools git fossology-nomos 
```

После установки пакетов необходимо добавить локального пользователя в hasher, от него будет выполняться сборка. _(в случае автора статьи это обусловлено удобством сборки)_

Добавление пользователя происходит под root пользователем, пользователем с повышенными правами..

:::info
Для понимания сразу оговорюсь

***$*** - выполнение команды от обычного пользователя

***#*** - выполнения команды от пользователя root
:::

выполняем команду добавления _локального пользователя_ и после выходим из root 

```
# hasher-useradd USER
# exit
```

USER = _локальный_ пользователь сборочницы

Далее уже от _локального_ пользователя создаём каталоги hasher и разу добавляем информацию в git

```
$ mkdir ~/.hasher
$ mkdir ~/hasher
$ git config --global user.name 'Aleksand Shamaraev'
$ git config --global user.email 'alexander.shad@alt-gnome.ru'
```

***
***Далее выполняем необходимые настройки доступа для hasher (ВАЖНО)***

***

:::info
Для правки файлов в каталоге хешера, возможно, потребуются права пользователя root 
:::

Открываем на редактирование файл ***fstab*** который находится в каталоге

```
/etc/hasher-priv/fstab
```

В данный файл добавляем строчку

```
tmpfs /dev/shm tmpfs defaults 0 0
```

Далее редактируем файл **system**, он находится там же, добавляем туда

```
allow_ttydev=yes
allowed_mountpoints=/proc,/dev/pts,/dev/console
rlimit_soft_cpu=72000
rlimit_hard_cpu=72600
wlimit_time_elapsed=468000
wlimit_time_idle=36000
wlimit_bytes_written=3355443200
```

Далее перезагружаем компьютер и после продолжаем настраивать.

"Устанавливаем" свой hasher, выполнив команду

```
$ hsh --initroot-only ~/.hasher
```

Далее идём в каталог и создаём файл **config**

```
/home/USER/.hasher/config
```

В данный файл пишем следующее содержимое

```
def_repo=/home/USER/hasher

known_mountpoints=/dev/pts,/proc,/dev/console
allowed_mountpoints=/dev/pts,/proc,/dev/console

packager="Aleksand Shamaraev <alexander.shad@alt-gnome.ru>"

export GCC_USE_CCACHE=1

lock_nowait=1.
```

USER = _локальному_ пользователю

Далее, создаём каталог где мы будем хранить клон репозиториев, пускай это будет **bild_packages**

```
$ mkdir ~/bild_packages
```

На этом настройка завершена


## Установка дополнительных пакетов в хешер

Установка дополнительных пактов во внутрь хешера осуществляется командой ***hsh-install***

То есть к примеру установка MC во внутрь хешера будет выглядеть так

```
$ hsh-install mc
```

## Проброска интернета во внутрь хешера

По умолчанию сборка внутри хешера осуществляется без доступа к сети, но иногда есть необходимость скачать дополнительные модули, для этого хешеру даётся доступ в сеть Интернет и выполняется вход во внутрь хешера с сетью.

Для того, что бы хешер увидел интернет необходимо для начала посмотреть наш сервер DNS

```
# cat /etc/resolv.conf
```

Далее пробрасываем его в хешер.

```
$ hsh-shell --rooter
echo nameserver 8.8.8.8 >> /etc/resolv.conf
exit
```

Где 8.8.8.8 = вашему DNS, который вы увидели командой выше.


Заходим в наш хешер с доступом в сеть Интернет.

```
$ hsh-install mc
$ share_ipc=yes share_network=yes hsh-shell --mount=/dev/pts,/proc
```

## Для информации

При каждой сборке пакета с помощью хешера, хешер как бы обнуляется и собирается.