$("#show_password_button").click((event) => {
    event.preventDefault()
    let password = $("#show_password_button").attr('data-password')
    let nama_webinar = $("#show_password_button").attr('data-nama-webinar')
    swal({
        title: `Password Room Webinar ${nama_webinar} :`,
        text: `${password}`
    })
})

// Delete Event
$("#hapus_button").click(function (e) {
    e.preventDefault()
    let kode_event = $("#hapus_button").attr("data-kode-event")
    let nama_webinar = $("#show_password_button").attr('data-nama-webinar')
    swal({
        title: `Apakah kamu yakin ingin menghapus webinar ${nama_webinar}`,
        icon: 'warning',
        buttons: {
            kembali: {
                className: "btn bg-gradient-info",
                text: "Kembali",
                value: 0
            },
            lanjut: {
                className: "btn bg-gradient-danger",
                text: "Iya Hapus aja",
                value: 1
            }
        }
    }).then((lanjut_hapus) => {
        if (lanjut_hapus) {
            var myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                redirect: 'follow'
            }
            // Set Loading UI
            swal({
                title: 'Tunggu Sebentar..',
                text: "Permintaan kamu sedang diproses",
                button: false
            })
            fetch(`${BASE_URL}/dashboard/event/delete/${kode_event}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    if (response.status_code == 200) {
                        swal({
                            title: `Berhasil menghapus webinar ${nama_webinar}`,
                            icon: 'success'
                        }).then(() => {
                            window.location.replace(`${BASE_URL}/dashboard/event/`);
                        })
                    }
                })
        }
    })
})