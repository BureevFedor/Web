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
                        <%=request.getSession(true).getAttribute("LastEntries")%>
                    </text>
                    <text id="LastX" hidden>
                        <%=request.getSession(true).getAttribute("LastX")%>
                    </text>
                    <text id="LastY" hidden>
                        <%=request.getSession(true).getAttribute("LastY")%>
                    </text>
                    <text id="LastR" hidden>
                        <%=request.getSession(true).getAttribute("LastR")%>
                    </text>
                </div>

                <div class="container">
                    <div class="pad_bot">
                        <button id="submit-button" type="submit" hidden>Проверка правильности</button>
                        <button id="reset-button" type="reset" hidden>Сброс таблицы</button>
                        <div class="back">
                            <a href="<%= request.getContextPath() %>/index.jsp">
                                <button id="submit-button" type="submit" onclick="document.forms[0].action = 'index.jsp'; return true;" >Вернуться на страницу с формой</button>
                            </a>
                        </div>
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
                                <%=request.getSession(true).getAttribute("LastTableData")%>
                            </tbody>
                        </table>
                    </div>
                </div>
            
            </div>
        </div>
    </form>

    <script type="text/javascript" src="js/jquery-3.5.1.min.js"></script>
    <script type="text/javascript" src="js/script.js"></script>

</body>

</html>