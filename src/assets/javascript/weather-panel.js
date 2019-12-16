$(document).ready(function () {
    atualizarTopResults();
});

$('input').keypress(function (e) {
    if (e.which == 13) {
        searchForCity();
    }
});

$('.city-container').click(function () {
    $('input').val($(this).children('span').text());
    searchForCity();
})

function searchForCity() {
    const path = '/search/' + $('input').val();
    $('.searchbar-container, .result__info-panel')
        .css("display", "none");
    $('.not-found').css("display", "block");
    $('.not-found').children('span').text("loading...");
    $.ajax({
        url: path,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.errors) {
                $('.not-found').children('span').text(data.errors);
                return;
            }

            $('.searchbar-container, .result__info-panel')
                .css("display", "block");
            $('.not-found').css("display", "none");

            //Formatação da data para exibição
            const date = new Date();
            const options = {weekday: 'long'};
            var weekday = date.toLocaleDateString('pt-BR', options);
            const formatAMPM = function (date) {
                var hours = date.getHours();
                var minutes = date.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
            };
            const hours = formatAMPM(date);

            //Setagem dos valores nos devidos components html
            $('#cityName').text(data.name + ', ' + data.sys.country);
            $('#data').text(
                (weekday.charAt(0).toUpperCase() + weekday.substring(1))
                + ', '
                + hours
                + ', '
                + (data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.substring(1))
            );
            $('#temp').text(Math.round(data.main.temp) + '°C');
            $('#humidity').text(data.main.humidity + '%');

            if($('.last-results').children('ul').children('li').length >= 5){
                $('.last-results').children('ul').find('li:first-child').remove();
            }

            // Adiciona cidade no historico de ultimas pesquisas
            $('.last-results').children('ul').append(`<li> 
                    ${data.name + ', ' + Math.round(data.main.temp) + '°C, '
            + data.weather[0].description.charAt(0).toUpperCase()
            + data.weather[0].description.substring(1)} a 0 minuto(s) atrás </li>`);

            checkDataBase(data.id);
        }
    });
}

function checkDataBase(cidadeId) {
    $.ajax({
        url: '/city/' + cidadeId,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            atualizarTopResults();
        }
    });
}

function atualizarTopResults() {
    $.ajax({
        url: '/getTopResults',
        type: 'GET',
        dataType: 'json',
        success: function (data) {

            $('.cities-container').empty();

            data.forEach(cidade => {
                $('.cities-container').append(`
                        <div class="city-container">
                            <span>${cidade.name}</span>
                        </div>
                    `);
            });
        },
        statusCode: {
            404: function () {
                $('.cities-container').css('display', 'none');
                $('.no-results').css('display', 'block');
                $('.no-results').children('span').text('Não há cidades no Top 5!')
            },
            200: function () {
                $('.cities-container').css('display', 'flex');
                $('.no-results').css('display', 'none');
            }
        }
    });
}

