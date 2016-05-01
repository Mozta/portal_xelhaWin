      google.charts.load('current', {'packages':['timeline']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var container = document.getElementById('timeline');
        var chart = new google.visualization.Timeline(container);
        var dataTable = new google.visualization.DataTable();

        dataTable.addColumn({ type: 'string', id: 'Departamentos' });
        dataTable.addColumn({ type: 'date', id: 'Start' });
        dataTable.addColumn({ type: 'date', id: 'End' });
        dataTable.addRows([
          [ 'Actividades recreativas', new Date(2016, 3, 7), new Date(2016, 3, 8) ],
          [ 'Atencion al Visitante', new Date(2016, 3, 8), new Date(2016, 3, 9) ],
          [ 'Finanzas y Control', new Date(2016, 3, 9), new Date(2016, 3, 10) ],
          [ 'Foto', new Date(2016, 3, 10), new Date(2016, 3, 11) ],
          [ 'Tiendas', new Date(2016, 3, 7), new Date(2016, 3, 11) ],
          [ 'X-Tours', new Date(2016, 3, 7), new Date(2016, 3, 11) ]
          ]);
        chart.draw(dataTable);
      }
