# Настройка дополнительного монитора

## Настройка дополнительного монитора

1. Откройте приложение «Настройки»
2. Нажмите пункт «Десплеи» на боковой панели, чтобы открыть раздел настроек
3. На схеме расположения мониторов мышью перетащите мониторы в желаемые для вас позиции
:::info
Когда вы находитесь в разделе Мониторы, в верхнем левом углу расположена миниатюры с номером дисплея
:::
4. Выберите Основной дисплей, для выбора основного монитора. Основной дисплей – это монитор, на котором отображается верхняя панель и доступен Обзор
5. Щёлкните на каждый монитор в списке и выберите ориентацию, разрешение, [масштаб](/scaling-the-screen) и частоту обновления
6. Нажмите Применить. Новые настройки сначала применяются в течение 20 секунд, и если эффект применения новых настроек вас не устроит, отмена настроеек произойдёт автоматически. Если отображение на экране(ах) корректны, нажмите «Сохранить изменения».

![display-dual-monitors-1](/display-dual-monitors/display-dual-monitors-1.gif)

## Режимы отображения

Для двух экранов доступны следующие режимы отображения:

- Объединить дисплеи - края экрана соединяются, чтобы объекты могли переходить с одного экрана на другой.
- Зеркальное отображение - одна и та же информация отображается на двух экранах с одинаковым разрешением и ориентацией.

Когда требуется только один дисплей, например, внешний монитор, подключенный к ноутбуку с закрытой крышкой, другой монитор можно отключить. В списке выберите монитор, который вы хотите отключить, и выключите его.

## Добавление нескольких мониторов

При наличии более двух экранов единственным доступным режимом является - Объединить дисплеи.

- Нажмите кнопку дисплея, который вы хотите настроить.
- Перетащите экраны в необходимые позиции.

## Изменение конфигурации для GNOME Display Manager (экран выбора пользователей)

После успешной настройки нескольких мониторов может возникнуть ситуация, когда информация о пользователе на экране
логина отображается не на основном мониторе. Всё дело в том, что когда вы настраиваете конфигурации мониторов, вы
делаете это только для своего пользователя. Проблему можно решить простым копированием конфигурационного файла из
папки своего пользователя в папку gdm (GNOME Display Manager)

```shell
cp --preserve=timestamps /home/CurrentUser/.config/monitors.xml /var/lib/gdm/.config/
```
Вместо CurrentUser подставьте своего пользователя

Теперь на экране логина будет подгружаться конфигурация мониторов, которую вы настроили под себя