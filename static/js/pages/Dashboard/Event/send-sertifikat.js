/**
 * Publisher
 * Toogle Status Button
 * Publish and Unpublish Event Controller in platform
 */
 $(".toggle-status-button").click(function (e) {
    e.preventDefault()
    let nama_peserta = $(this).attr("data-nama-peserta")
    let email_peserta = $(this).attr("data-email-peserta")
    let action = $(this).attr("data-action")
    swal({
        title: `Apakah kamu yakin ingin ${action} sertifikat kepada ${email_peserta} ?`,
        icon: 'warning',
        buttons: {
            kembali: {
                className: "btn bg-gradient-info",
                text: "Kembali",
                value: 0
            },
            lanjut: {
                className: "btn bg-gradient-danger",
                text: "Iya",
                value: 1
            }
        }
    }).then((lanjut) => {
        if (lanjut) {
            var myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json");
            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            }
            fetch(`${BASE_URL}/dashboard/sertfikat/id/<id>/${action}/${nama_peserta}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    if (response.status_code == 200) {
                        swal({
                            title: `Berhasil ${action} sertifikat kepada ${email_peserta}`,
                            icon: 'success'
                        }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        }
    })
})