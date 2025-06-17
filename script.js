window.addEventListener("load", (event) => {
    document.getElementById("attachment_button").addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("attachment_input").click();
    });

    document.getElementById("attachment_input").addEventListener("change", function(e) {
        document.getElementById("attachment_text").classList.remove("red");
        document.getElementById("attachment_text").innerHTML = `(${this.files.length} file${this.files.length == 1 ? "" : "s"} attached)`;
        if(this.files.length == 0) {
            document.getElementById("attachment_text").style.display = "none";
        } else {
            document.getElementById("attachment_text").style.display = "block";
        }

        if(this.files.length === 0) {
            return;
        }

        document.getElementById("files_holder").innerHTML = '';

        for(var i = 0; i < this.files.length; i++) {
            if(this.files[i].size >= 5000000-1) {
                document.getElementById("attachment_text").innerHTML = "File(s) exceed 5MB!";
                document.getElementById("attachment_text").style.display = "block";
                document.getElementById("attachment_text").classList.add("red");
                return;
            }
        }

        for(var i = 0; i < this.files.length; i++) {
            const newFileElement = document.createElement("input");
            newFileElement.type = 'file';
            newFileElement.name = `attachment_${i}`;

            const dt = new DataTransfer();
            dt.items.add(this.files[i]);
            newFileElement.files = dt.files;

            document.getElementById("files_holder").appendChild(newFileElement);

        }

    });
});