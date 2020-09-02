$(document).ready(function () {
  $('#gamesTable').DataTable({
    searching: false,
    paging: true,
  });
  $('.dataTables_length').addClass('bs-select');
});
