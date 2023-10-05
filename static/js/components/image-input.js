// inisiasi localstroge
localStorage.setItem('fileInputBase64', '')
localStorage.setItem('adaGambarBaru', 0)


// Event Ketika ada gambar yang diupload kedalam fileinput
const fileInput = document.getElementById("fileInput")
fileInput.addEventListener("change", () => {
    let reader = new FileReader();
    reader.onload = () => {
        // Update localstorage untuk menyimpan fileinput dalam format base64
        localStorage.setItem('fileInputBase64', reader.result)
        localStorage.setItem('adaGambarBaru', 1)
        
        // Reset current preview image 
        $("#preview-image").remove();
        
        // Create UI to preview image
        let image = document.createElement("img");
        $(image).attr({
            "src": reader.result,
            "style": "opacity: 0.8; max-width:100%; height:300px; object-fit: cover;",
            "alt": "data",
            "id" : "preview-image",
            "class" : "mb-3",
        });   
        $(".img-preview").append(image).addClass('text-center');
        $(".dropzone-wrapper").hide();
    }
    reader.readAsDataURL(fileInput.files[0]);
})

// Event ketika tombol reset diklik
const resetButton = document.getElementById("reset_button")
resetButton.addEventListener("click", (e) => {
    e.preventDefault();
    $(".dropzone-wrapper").show();
    $("#preview-image").remove();
    result.innerText = "";
    $(".result-container").removeClass("result-container-display");
    // reset localstroage value
    localStorage.setItem('fileInputBase64', '')
})