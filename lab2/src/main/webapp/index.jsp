<%@ page contentType="text/html;charset=UTF-8" %>

<html>
<head>
	<title>2ЛР Веб-Программирование</title>
	<link rel="icon" type="image/png" href="images/frog.png">
	<link rel="stylesheet" href="styles.css">
</head>

<body>

    <header>
        <div class="header">
            <h1 class="header">ЛАБОРАТОРНАЯ РАБОТА 2</h1>
            <div>
                <p class="header2">
                    Буреев Фёдор P3207 333975 вар. 1371
                </p>
            </div>
        </div>
    </header>

    <form action="" id="inputForm">
        <div class="wrapper">
            <div class="grid">
                <div class="canvas">
                    <canvas id="graphic" height="500" width="500"></canvas>
                    <text id="entries" hidden>                                
                        <jsp:include page="entries.jsp"/>
                    </text>
                    <text id="LastX" hidden>
                        <% if (request.getSession(true).getAttribute("LastX") != null) {%>
                            <%=request.getSession(true).getAttribute("LastX")%>
                        <% } %>
                    </text>
                    <text id="LastY" hidden>
                        <% if (request.getSession(true).getAttribute("LastY") != null) {%>
                            <%=request.getSession(true).getAttribute("LastY")%>
                        <% } %>
                    </text>
                    <text id="LastR" hidden>
                        <% if (request.getSession(true).getAttribute("LastR") != null) {%>
                            <%=request.getSession(true).getAttribute("LastR")%>
                        <% } %>
                    </text>
                </div>

                <div class="container">
                    <div class="pad_bot">
                        
                        <img src="images/duck-girl.gif" class="image_b">

                        <div class="custom">
                            <p>
                                <b>
                                    X: 
                                </b>
                                <table>
                                    <tr>
                                        <td><input type="checkbox" id="x-checkbox1" name="x1" value="-2">-2</td>
                                        <td><input type="checkbox" id="x-checkbox2" name="x2" value="-1.5">-1.5</td>
                                        <td><input type="checkbox" id="x-checkbox3" name="x3" value="-1">-1</td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="x-checkbox4" name="x4" value="-0.5">-0.5</td>
                                        <td><input type="checkbox" id="x-checkbox5" name="x5" value="0">0</td>
                                        <td><input type="checkbox" id="x-checkbox6" name="x6" value="0.5">0.5</td>
                                    </tr>
                                    <tr>
                                        <td><input type="checkbox" id="x-checkbox7" name="x7" value="1">1</td>
                                        <td><input type="checkbox" id="x-checkbox8" name="x8" value="1.5"> 1.5</td>
                                        <td><input type="checkbox" id="x-checkbox9" name="x9" value="2"> 2</td>
                                    </tr>
                                </table>
                            </p>
                        </div>

                        <div class="custom">
                            <label for="y_coords"><b>Y : </b></label>
                            <input type="text" name="y" maxlength="5" size="6" id = "Y" placeholder=" от -5 до 5" class="my-input" required/>
                        </div>

                        <div class="custom">
                            <label for="r_coords"><b>R : </b></label>
                            <form name = "radioForm">
                                <input type="radio" name = "r" id = "R1" value="1" onclick="clearValidity()" onchange="changeR()"><label for="R1">1</label>
                                <input type="radio" name = "r" id = "R2" value="1.5" onclick="clearValidity()" onchange="changeR()"><label for="R2">1.5</label>
                                <input type="radio" name = "r" id = "R3" value="2" onclick="clearValidity()" onchange="changeR()"><label for="R3">2</label>
                                <input type="radio" name = "r" id = "R4" value="2.5" onclick="clearValidity()" onchange="changeR()"><label for="R4">2.5</label>
                                <input type="radio" name = "r" id = "R5" value="3" onclick="clearValidity()" onchange="changeR()"><label for="R5">3</label>
                            </form>
                            <script>
                                function clearValidity() {
                                    document.getElementById('R1').setCustomValidity('');
                                }
                            </script>
                        </div>
                        
                        <button id="submit-button" type="submit">Проверка правильности</button>
                        <button id="reset-button" type="reset">Сброс таблицы</button>

                    </div>
                </div>

                <div class="container">
                    <div class="table">
                        <table id = "resultTable">
                            <thead>
                                <th colspan="1" style="width: 10%">X</th>
                                <th colspan="1" style="width: 10%">Y</th>
                                <th colspan="1" style="width: 10%">R</th>
                                <th colspan="1" style="width: 50%">Время </th>
                                <th colspan="1" style="width: 10%">Выполнение </th>
                                <th colspan="1" style="width: 10%">Результат</th>
                            </thead>
                            <tbody class="table" id="tableBody">
                                <% if (request.getSession(true).getAttribute("tableData") != null) {%>
                                <%=request.getSession(true).getAttribute("tableData")%>
                                <% } %>
                            </tbody>
                        </table>
                    </div>
                </div>
            
            </div>
        </div>
    </form>

    <p>
        <a class="list" href="https://se.ifmo.ru/courses/web#labs" target="_blank">
            <b>☞Курс веб-программирования☚</b>
        </a> 
        
        <br>
        
    <a class="list" href="https://www.youtube.com/watch?v=J78e_88FTvg&list=PLBWafxh1dFuzOL-NPuOSmo5HLhboAAOWV" target="_blank"><b>☞Плейлист лекций☚</b></a></p>

    <p> Условие: </p>

    <p>
        <b>
            Разработать веб-приложение на базе сервлетов и JSP, определяющее попадание точки на координатной плоскости в заданную область. <br>
            Приложение должно быть реализовано в соответствии с шаблоном MVC и состоять из следующих элементов:<br>
            ControllerServlet, определяющий тип запроса, и, в зависимости от того, содержит ли запрос информацию о координатах точки и радиусе, делегирующий его обработку одному из перечисленных ниже компонентов. Все запросы внутри приложения должны передаваться этому сервлету (по методу GET или POST в зависимости от варианта задания), остальные сервлеты с веб-страниц напрямую вызываться не должны. <br>
            AreaCheckServlet, осуществляющий проверку попадания точки в область на координатной плоскости и формирующий HTML-страницу с результатами проверки. Должен обрабатывать все запросы, содержащие сведения о координатах точки и радиусе области. <br>
            Страница JSP, формирующая HTML-страницу с веб-формой. Должна обрабатывать все запросы, не содержащие сведений о координатах точки и радиусе области.   <br>
        </b>
    </p>

    <p> 
        Разработанная страница JSP должна содержать: <br>

        1. "Шапку", содержащую ФИО студента, номер группы и номер варианта. <br>
        2. Форму, отправляющую данные на сервер. <br>
        3. Набор полей для задания координат точки и радиуса области в соответствии с вариантом задания. <br>
        4. Сценарий на языке JavaScript, осуществляющий валидацию значений, вводимых пользователем в поля формы. <br>
        5. Интерактивный элемент, содержащий изображение области на координатной плоскости (в соответствии с вариантом задания) и реализующий следующую функциональность: <br>
        Если радиус области установлен, клик курсором мыши по изображению должен обрабатываться JavaScript-функцией, определяющей координаты точки, по которой кликнул пользователь и отправляющей полученные координаты на сервер для проверки факта попадания. <br>
        В противном случае, после клика по картинке должно выводиться сообщение о невозможности определения координат точки. <br>
        После проверки факта попадания точки в область изображение должно быть обновлено с учётом результатов этой проверки (т.е., на нём должна появиться новая точка). <br>
        6. Таблицу с результатами предыдущих проверок. Список результатов должен браться из контекста приложения, HTTP-сессии или Bean-компонента в зависимости от варианта. <br>
    </p>

    <p>
        Страница, возвращаемая AreaCheckServlet, должна содержать: <br>

        1. Таблицу, содержащую полученные параметры. <br>
        2. Результат вычислений - факт попадания или непопадания точки в область. <br>
        3. Ссылку на страницу с веб-формой для формирования нового запроса. <br>
        Разработанное веб-приложение необходимо развернуть на сервере WildFly. Сервер должен быть запущен в standalone-конфигурации, порты должны быть настроены в соответствии с выданным portbase, доступ к http listener'у должен быть открыт для всех IP. <br>
    </p>

    <script type="text/javascript" src="js/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>

</body>

</html>