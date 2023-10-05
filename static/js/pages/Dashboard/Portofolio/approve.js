/**
 * Publisher
 * Toogle Status Button
 * Publish and Unpublish Event Controller in platform
 */
 $(".toggle-status-button").click(function (e) {
    e.preventDefault()
    let id_portofolio = $(this).attr("data-id-portofolio")
    let judul_portofolio = $(this).attr("data-judul-portofolio")
    let action = $(this).attr("data-action")
    swal({
        title: `Apakah kamu yakin ingin ${action} portofolio dengan judul ${judul_portofolio} ?`,
        icon: 'warning',
        buttons: {
            kembali: {
                className: "btn bg-gradient-info",
                text: "Tidak",
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
                method: 'PUT',
                headers: myHeaders,
                redirect: 'follow'
            }
            fetch(`${BASE_URL}/dashboard/portofolio/${action}/${id_portofolio}`, requestOptions)
                .then(response => response.json())
                .then(response => {
                    if (response.status_code == 200) {
                        swal({
                            title: `Berhasil ${action} portofolio dengan judul ${judul_portofolio}`,
                            icon: 'success'
                        }).then(() => {
                            window.location.reload()
                        })
                    }
                })
        }
    })
})