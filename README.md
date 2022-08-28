# Список документов, удостоверяющих личность

## Инструкции по развертыванию

Проект выполнен на Ангуляр 14.
Необходимо с помощью angular cli запустить проект (ng serve)  
Так же необходимо запустить json server с помощью json-server --watch src/database/documents.json

## Задание

Разработать тестовое веб-приложение
"Список документов, удостоверяющих личность".
На основной странице приложении должна располагаться панель поиска и таблица со списком документов, удостоверяющих личность, содержащая поля:
•	Вид документа
•	Серия
•	Номер
•	Дата выдачи
Значения в таблицу должны выводится из базы данных или json server.
Панель поиска должна позволять искать (в случае работы без бэка - фильтровать) записи в таблице по нажатию кнопки «Найти». Поиск по номеру должен осуществляться по вхождению с начала строки. Кнопка «Очистить» очищает поисковые поля и сбрасывает фильтрацию в таблице с документами.
Таблица должна поддерживать сортировку по всем полям (по клику на название колонки) и пагинацию.
Также над таблицей должны располагаться кнопки «Добавить», «Редактировать», «Удалить» и чек-бокс «Показать архивные». Строка с архивным документом должна выделяться цветом (например, зеленым). В зависимости от значения чек-бокса «Показать архивные» в таблице должны скрываться или показываться архивные записи. 
Основной документ должен помечаться галочкой в начале строке (см. первую строчку на картинке).

Таблица должна позволять выбирать не более одной активной записи для осуществления операций редактирования или удаления записей. Если запись с документом в таблице не выбрана, то кнопки «Редактировать» и «Удалить» должны становится неактивными.

По нажатию на кнопку «Добавить» на основной странице должно открываться всплывающее модальное окно «Документ» со следующими полями:
•	Вид документа
•	Серия (текстовое поле)
•	Номер (текстовое поле)
•	Дата выдачи (поле с выбором даты)
•	Организация, выдавшая документ
•	Код подразделения (текстовое поле с маской «999-999»)
•	Чек-бокс «Основной документ»
•	Чек-бокс «Архивный документ»
Поля «Вид документа» и «Номер» сделать обязательными для заполнения.
По нажатию на кнопку "Сохранить" информация, введенная в экранную форму сохраняется в БД, окно закрывается и новый добавленный документ отображается в основной таблице.
По нажатию на кнопку «Выход» модальное окно закрывается без сохранения информации.
По нажатию на кнопку «Изменить» на основной странице должно открываться всплывающее модальное окно «Документ» с полями, заполненными в соответствии с документом, выбранным в основной таблице. Данные в модальное окно «Документ» необходимо прокидывать из основной таблицы, а не из БД. По нажатию на кнопку "Сохранить" информация, введенная в экранную форму сохраняется в БД, окно закрывается и данные по выбранному документу обновляются в основной таблице.
По нажатию на кнопку «Удалить» на основной странице документ, выбранный в основной таблице, удаляется из БД и из основной таблицы на экране.
