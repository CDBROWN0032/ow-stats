$(document).ready(function () {
  $('#allGames').DataTable({
    searching: true,
    paging: true,
    createdRow: function (row, data, dataIndex) {
      setRowColor(data, row);
    },
  });
  $('#newGames').DataTable({
    searching: false,
    paging: false,
    createdRow: function (row, data, dataIndex) {
      setRowColor(data, row);
    },
  });

  $('.dataTables_length').addClass('bs-select');
});

function setRowColor(data, row) {
  if (data[2] === 'LOSS') {
    $(row).addClass('table-danger');
  } else if (data[2] === 'WIN') {
    $(row).addClass('table-primary');
  } else if (data[2] === 'DRAW') {
    $(row).addClass('table-info');
  }
}
