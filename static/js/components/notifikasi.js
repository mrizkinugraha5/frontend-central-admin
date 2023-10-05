$("#notifikasiButton").click(function (e) {
    e.preventDefault();
    /**
     * 👮‍♀️ Pencegahan untuk menghindari request 
     * API "Update Notifikasi is_read Status" secara terus menerus
     * maka digunakan variabel tambahan bernama data-clicked
     * untuk menandakan apakah tombol notifikasi sudah diklik
    */
    var is_clicked = $(this).attr('data-clicked')
    if (is_clicked == 0) {
        var daftar_notifikasi = new Array()
        $(".notifikasi-item").map((index, element) => {
            daftar_notifikasi.push($(element).attr('data-id'))
        })

        // 🚀 kirim data notifikasi yang sudah dibaca ke API 
        var myHeaders = new Headers()
        var requestOptions = {
            method: 'PUT',
            redirect: 'follow'
        }

        daftar_notifikasi.map((notifikasi_id) => {
            fetch(`${BASE_URL}/dashboard/notifikasi/${notifikasi_id}`, requestOptions)
        })
    }
    $(this).attr('data-clicked', 1)     // set clicked variable to 1
});