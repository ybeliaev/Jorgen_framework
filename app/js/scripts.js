
// ====================Active==================

//e.preventDefault();

    let elements = document.getElementsByClassName("maneMenu");
    for (let i = 0; i < elements.length; i++){
        elements[i].onclick = function () {
            let el = elements[0];
            while(el){
                if(el.tagName ==="A"){
                    el.classList.remove("active");
                }

                el = el.nextSibling;
            }
            this.classList.add("active");
        }
    }
    
