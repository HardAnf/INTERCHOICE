Frontend-часть сервиса для создания и просмотра интерактивного кино.

Инструкция по установке:

cd frontend
npm install
npm run start

Для работы с бэкендом при развёртывании на локальной машине, используйте следующий скрипт для добавления адреса local.interchoice.ru в файл /etc/hosts:
sudo sh hosts.sh

После этого сервис будет доступен по адресу https://local.interchoice.ru:3000

Инструкция по сборке:

cd frontend
npm install
npm run prod