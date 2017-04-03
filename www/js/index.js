// Giftr
// Riley Griffith
// grif0193@algonquinlive.com
// v 1.0.0
// April 1 2017

 if(localStorage.getItem("giftr-grif0193")){
   var people = JSON.parse(localStorage.getItem("giftr-grif0193"));
} 
 else {
   var people = {"people":[]}; 
}
 let currentPerson = 0;
 let page = "birthdays";
    
var app = {
    onDeviceReady: function() {
        console.log("onDeviceReady")
        window.addEventListener('push', app.change);
        app.showList();
    },
    
    change: function(){
        if (document.getElementById("add")){
        console.log("Birthdays")
        page = "birthdays";
        app.addBir();
        app.removeGift();
        app.showList();
        } else {
        console.log("Add");
        page = "add"
        app.removeBir();
        app.addGift();
        app.showIdea();
        }},
    
    addBir: function(){
        let btnSave = document.getElementById("btnSave");
        let btnCancel = document.getElementById("btnCancel");
        btnCancel.addEventListener("click", app.toggleModal);
        btnSave.addEventListener("click", app.savePerson);
    },
    removeBir: function(){
        let btnSave = document.getElementById("btnSave");
        let btnCancel = document.getElementById("btnCancel");
        btnCancel.removeEventListener("click", app.toggleModal);
        btnSave.removeEventListener("click", app.savePerson);
    },
    addGift: function(){
        let btnSave = document.getElementById("btnSave");
        let btnCancel = document.getElementById("btnCancel");
        btnCancel.addEventListener("click", app.toggleModal);
        btnSave.addEventListener("click", app.saveIdea);
    },
    removeGift: function(){
        let btnSave = document.getElementById("btnSave");
        let btnCancel = document.getElementById("btnCancel");
        btnCancel.removeEventListener("click", app.toggleModal);
        btnSave.removeEventListener("click", app.saveIdea);
    },
    
    //Also edits people
    savePerson: function(){
        app.toggleModal();
        if(localStorage.getItem("giftr-grif0193")){
        var temp = JSON.parse(localStorage.getItem("giftr-grif0193"));
        }
        if (currentPerson == 0){
        console.log("savePerson")
        let list = document.getElementById("contact-list")
        let name = document.getElementById("name").value;
        let dateOB = document.getElementById("DOB").value;
        let li = document.createElement("li");
        let span = document.createElement("span");
        let a = document.createElement("a");
        let nav = document.createElement("a");
        let dob = document.createElement("span");
        let id = Date.now();
        console.log("id: " + id);
        nav.addEventListener("touchstart", app.getCurrent());
        a.addEventListener("touchstart", app.getCurrent());
        a.textContent = name;
        li.classList.add("table-view-cell")
        li.setAttribute("id", id);
        span.classList.add("name")
        nav.classList.add("navigate-right");
        nav.classList.add("pull-right");
        nav.setAttribute("href", "gifts.html")
        a.setAttribute("href", "#personModal");
        dob.classList.add("dob");
        dob.textContent = dateOB;
        
        let person = {
            "id": id,
            "name": name,
            "dob": dateOB,
            "ideas": []
        }
        if(localStorage.getItem("giftr-grif0193")){
        console.log(temp);
        temp.people.push(person);
        localStorage.setItem("giftr-grif0193", JSON.stringify(temp));
        } else{
        people.people.push(person);
        localStorage.setItem("giftr-grif0193", JSON.stringify(people));
        }
        console.log(people);
        nav.appendChild(dob);
        span.appendChild(a);
        li.appendChild(nav);
        li.appendChild(span);
        list.appendChild(li);
        } else {
        for (let c=0; c< temp.people.length; c++){
            if (temp.people[c].id == currentPerson){
                let name = document.getElementById("name").value;
                let dob = document.getElementById("DOB").value;
                console.log(temp)
                temp.people[c].name = name;
                temp.people[c].dob = dob;
                localStorage.setItem("giftr-grif0193", JSON.stringify(temp));
                currentPerson = 0;
            }
        }    
            app.showList();
            
            
        }},
    showList: function(){
        if(localStorage.getItem("giftr-grif0193")){
        let currentLocal = localStorage.getItem("giftr-grif0193");
        let retrieved = JSON.parse(currentLocal);
        let rPerson = retrieved.people;
        let list = document.getElementById("contact-list")
        list.innerHTML = "";
        rPerson.forEach(function(retrive){
            let li = document.createElement("li");
            let span = document.createElement("span");
            let a = document.createElement("a");
            let nav = document.createElement("a");
            let dob = document.createElement("span");
            li.classList.add("table-view-cell")
            li.setAttribute("id", retrive.id);
            span.classList.add("name")
            nav.classList.add("navigate-right");
            nav.classList.add("pull-right");
            nav.setAttribute("href", "gifts.html")
            a.setAttribute("href", "#personModal");
            a.addEventListener("touchstart", app.getCurrent);
            dob.classList.add("dob");
            dob.textContent = retrive.dob;
            a.textContent = retrive.name;
            if (dob.textContent == ""){
                dob.textContent = "No Birthday Set"
            }
            if (a.textContent == ""){
                a.textContent = "Unknown";
            }
            nav.appendChild(dob);
            span.appendChild(a);
            li.appendChild(span);
            li.appendChild(nav);
            list.appendChild(li)
            
            
        })
        console.log(retrieved);
    }
        app.addBir()
    },
    
    
    saveIdea: function(){
        app.toggleModal();
        if(localStorage.getItem("giftr-grif0193")){
         let ideas = localStorage.getItem("giftr-grif0193");   
        }
        let gift1 = document.getElementById("gift").value
        let place1 = document.getElementById("place").value
        let url1 = document.getElementById("url").value
        let cost1 = document.getElementById("cost").value
        
        let id = Date.now();
        
        let li = document.createElement("li");
        let trash = document.createElement("span");
        let div = document.createElement("div");
        let h4 = document.createElement("h4");
        let place = document.createElement("p");
        let href = document.createElement("p");
        let hrefA = document.createElement("a");
        let price = document.createElement("p");
        
        li.classList.add("table-view-cell", "media");
        div.classList.add("media-body");
        trash.setAttribute("id", id);
        trash.className = "icon icon-trash pull-right midline";
        //trash.addEventListener("touchstart", app.deleteIdea);
        let idea = {
                "id": Date.now(),
                "gift": gift1,
                "place": place1,
                "price": cost1,
                "url": url1
            }
            //ideas.people[index].ideas.push(idea);
            //ideas = JSON.stringify(stored);
            //localStorage.setItem("giftr-grif0193", stored)
        
        h4.textContent = gift1;
        place.textContent = place1;
        hrefA.textContent = url1;
        hrefA.href = url1;
        price.textContent = cost1;
        
        
        div.appendChild(trash);
        div.appendChild(h4);
        div.appendChild(place);
        href.appendChild(hrefA);
        div.appendChild(href);
        li.appendChild(div);
        document.getElementById("gift-list").appendChild(li);
    },
    showIdea: function(){
        if(localStorage.getItem("giftr-grif0193")){
            let ideas = JSON.parse(localStorage.getItem("giftr-grif0193"));
            ideas.people.forEach(function(value, i){
                
                
                
            })
            
            
            
            
            let li = document.createElement("li");
            let trash = document.createElement("span");
            let div = document.createElement("div");
            let h4 = document.createElement("h4");
            let giftName = document.createElement("p");
            let href = document.createElement("p");
            let hrefA = document.createElement("a");
            let price = document.createElement("p");
            li.classList.add("table-view-cell", "media");
            div.classList.add("media-body");
        }
    },
    deleteIdea: function(){
        
    },
    
    
    
    getCurrent: function(ev){
        let child = ev.currentTarget.parentElement;
        let p = child.parentElement;
        currentPerson = p.getAttribute("id");
        console.log(currentPerson)
    },
    toggleModal: function(){
        if (page == "birthdays") {
        console.log("toggle Modal")
            
        personModal.classList.toggle("active");
        } else if (page == "add") {
        console.log("toggle Modal")
        giftModal.classList.toggle("active");
        }
    },
};

document.addEventListener("DOMContentLoaded", app.onDeviceReady);