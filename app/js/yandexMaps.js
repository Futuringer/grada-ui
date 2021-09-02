
ymaps.ready(function () {

    var myMap = new ymaps.Map('map', {
            center: [57.763180, 40.946253],
            zoom: 16,
            controls:[] //тут я отключил кнопочки

        }, {
            searchControlProvider: 'yandex#search'
        },
        {
          suppressMapOpenBlock: true 
        }
        );

    myGeoObject = new ymaps.GeoObject({
        // Геометрия = тип геометрии + координаты геообъекта.
        geometry: {
            // Тип геометрии - прямоугольник.
            type: 'Rectangle',
            // Координаты.
            coordinates: [
                [0, 0],
                [100, 100]
            ]
        },
        // Свойства.
        properties: {
           // hintContent: 'Перетащи меня!',
            //balloonContent: 'Прямоугольник 2'
        }
    }, {
        // Опции.
        // Объект можно перетаскивать.
        draggable: false,
        // Цвет и прозрачность заливки.
        fillColor: '#3C444D',
        fillOpacity: '0.9',
        // Цвет и прозрачность границ.
        strokeColor: '#3caa3c88',
        // Ширина линии.
        strokeWidth: 7
    });


        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            //hintContent: 'Собственный значок метки',
            //balloonContent: 'Это красивая метка'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: './../images/src/placePointer.svg',
            // Размеры метки.
            iconImageSize: [80, 80],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-40, -40]
        }),
        

       /* myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
            hintContent: 'Собственный значок метки с контентом',
            balloonContent: 'А эта — новогодняя',
            iconContent: '12'
        }
        
        , {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#imageWithContent',
            // Своё изображение иконки метки.
            iconImageHref: 'images/ball.png',
            // Размеры метки.
            iconImageSize: [48, 48],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-24, -24],
            // Смещение слоя с содержимым относительно слоя с картинкой.
            iconContentOffset: [15, 15],
            // Макет содержимого.
            iconContentLayout: MyIconContentLayout
        });
*/

    myMap.geoObjects
        .add(myPlacemark)
       // .add(myPlacemarkWithContent)
        .add(myGeoObject);
});
