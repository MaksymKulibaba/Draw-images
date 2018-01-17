// $(document).ready(function() {
    var canvas;
    var context;

    window.onload = function () {
        canvas = document.getElementById("drawingCanvas");
        context = canvas.getContext("2d");

        // Подключаем требуемые для рисования события
        canvas.onmousedown = startDrawing;
        canvas.onmouseup = stopDrawing;
        canvas.onmouseout = stopDrawing;
        canvas.onmousemove = draw;

        var isDrawing;


        function startDrawing(e) {
            // Начинаем рисовать
            isDrawing = true;

            // Создаем новый путь
            context.beginPath();

            // Нажатием левой кнопки мыши помещаем мышку на холст
            context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
        }

        function draw(e) {
            if (isDrawing == true) {
                // Определяем текущие координаты указателя мыши
                var x = e.pageX - canvas.offsetLeft;
                var y = e.pageY - canvas.offsetTop;

                // Рисуем линию до новой координаты
                context.lineTo(x, y);
                context.stroke();
            }
        }

        // перестаем рисовать
        function stopDrawing() {
            isDrawing = false;
        }
    };
    var value;
    var key;
    var imageCopy;
    var imageContainer;
    var allPictures;

    // добавление пары ключ:значение в LocalStorage
    function saveToLocalStorage() {

        // ключ берем с инпута
        key = document.getElementById("name").value;

        // превращаем рисунок в код функцией toDataURL
        value = canvas.toDataURL();
        localStorage.setItem(key, value);
    }

    // достать рисунок из LocalStorage
    function getFromLocalStorage() {
        // берем значение из инпут
        key = document.getElementById("name").value;
        imageCopy = document.getElementById("savedImageCopy");

        //записываем в адрес картинки value
        imageCopy.src = localStorage.getItem(key);

        imageContainer = document.getElementById("savedCopyContainer");
        imageContainer.style.display = "block";

        // очищаем холст
        context.clearRect(0, 0, 700, 600);

        // добавляем выбраный рисунок на холст
        context.drawImage(imageCopy, 0, 0)
    }

    // очистить холст
    function clearCanvas() {
        context.clearRect(0, 0, 700, 600)
    }

    // взять все значения key из LocalStorage и добавить в select
    function getAllPictures() {
        var str = '<option value="">Список рисунков</option>';
        for (var i = 0; i < localStorage.length; i++) {
            str += '<option value="' + localStorage.key(i) + '">' + localStorage.key(i) + '</option>';
        }
        allPictures = document.getElementById("elements").innerHTML = str;
    }
    getAllPictures();
    // при изменении option в select подтягивать нужную картинку в #savedCopyContainer для предворительного просмотра.
    // после надатия "Загрузить из LocalStorage" рисунок добавится на холст
    function changePicture() {
        allPictures = document.getElementById("elements")
        value = allPictures.options[allPictures.selectedIndex].value;
        document.getElementById("name").value = value;
        imageCopy = document.getElementById("savedImageCopy");
        imageCopy.src = localStorage.getItem(value);
        imageContainer = document.getElementById("savedCopyContainer");
        imageContainer.style.display = "block";
    }
// });