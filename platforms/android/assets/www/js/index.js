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
 let personIndex = 0;
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
        currentPerson = 0;
        } else {
        console.log(localStorage);
        console.log(currentPerson);
        page = "add"
        app.removeBir();
        app.addGift();
        app.showIdea();
        }},
    
    addBir: function(){
        let btnSave = document.getElementById("btnSave");
        let btnCancel = document.getElementById("btnCancel");
        btnCancel.addEventListener("touchend", app.toggleModal);
        btnSave.addEventListener("touchend", app.savePerson);
    },
    removeBir: function(){
        let btnSave = document.getElementById("btnSave");
        let btnCancel = document.getElementById("btnCancel");
        btnCancel.removeEventListener("touchend", app.toggleModal);
        btnSave.removeEventListener("touchend", app.savePerson);
    },
    addGift: function(){
        let btnSave = document.getElementById("btnSave");
        let btnCancel = document.getElementById("btnCancel");
        btnCancel.addEventListener("touchend", app.toggleModal);
        btnSave.addEventListener("touchend", app.saveIdea);
    },
    removeGift: function(){
        let btnSave = document.getElementById("btnSave");
        let btnCancel = document.getElementById("btnCancel");
        btnCancel.removeEventListener("touchend", app.toggleModal);
        btnSave.removeEventListener("touchend", app.saveIdea);
    },
    
    
    
    
    //Also edits people
    savePerson: function(){
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
        nav.addEventListener("touchend", app.getCurrentDOB);
        a.addEventListener("touchend", app.getCurrent);
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
            
            
        }
    app.toggleModal();
    },
    showList: function(){
        if(localStorage.getItem("giftr-grif0193")){
        let currentLocal = localStorage.getItem("giftr-grif0193");
        let retrieved = JSON.parse(currentLocal);
        let rPerson = retrieved.people;
        let list = document.getElementById("contact-list")
        list.innerHTML = "";
            
        function sortPeople(apples, oranges) {
                if (apples.dob.substring(5) < oranges.dob.substring(5)) return -1;
                if (apples.dob.substring(5) > oranges.dob.substring(5)) return 1;
                return 0;
            }
        
        rPerson.sort(sortPeople);
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
            nav.addEventListener("touchend", app.getCurrentDOB);
            a.addEventListener("touchend", app.getCurrent);
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
            
            currentPerson = 0;
        })
        app.addBir()
        }
},
    
    
    saveIdea: function(){
        app.toggleModal();
        if(document.getElementById('gift').value 
            || document.getElementById('place').value 
            || document.getElementById('url').value
            || document.getElementById('cost').value){
        if(localStorage.getItem("giftr-grif0193")){
         var ideas = JSON.parse(localStorage.getItem("giftr-grif0193"));
         let gift1 = document.getElementById("gift").value;
         let place1 = document.getElementById("place").value;
         let url1 = document.getElementById("url").value;
         let cost1 = document.getElementById("cost").value;
         
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
         trash.addEventListener("touchend", app.deleteIdea);
         let idea = {
                 "id": id,
                 "gift": gift1,
                 "place": place1,
                 "price": cost1,
                 "url": url1
             }
        for (let c=0; c < ideas.people.length; c++){
            if(currentPerson == ideas.people[c].id){
             console.log("current")
             ideas.people[c].ideas.push(idea);
             ideas = JSON.stringify(ideas);
             localStorage.setItem("giftr-grif0193", ideas);
            }}
             
        
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
        }
        }
    },
    showIdea: function(){
        if(localStorage.getItem("giftr-grif0193")){
            let ideas = JSON.parse(localStorage.getItem("giftr-grif0193"));
            document.getElementById("gift-list").innerHTML = "";
            for (let i = 0; i < ideas.people.length; i++){
                if (currentPerson == ideas.people[i].id) {
                 ideas.people[i].ideas.forEach(function(idea){
                     let li = document.createElement("li");
                     let trash = document.createElement("span");
                     let div = document.createElement("div");
                     let h4 = document.createElement("h4");
                     let place = document.createElement("p");
                     let href = document.createElement("p");
                     let hrefA = document.createElement("a");
                     let price = document.createElement("p");
                     h4.textContent = idea.gift
                     place.textContent = idea.place;
                     price.textContent = idea.price;
                     hrefA.textContent = idea.url;
                     hrefA.href = idea.url;
                     li.classList.add("table-view-cell", "media");
                     div.classList.add("media-body");
                     trash.setAttribute("id", idea.id);
                     trash.className = "icon icon-trash pull-right midline";
                     trash.addEventListener("touchend", app.deleteIdea);
                     
                     div.appendChild(trash);
                     div.appendChild(h4);
                     div.appendChild(place);
                     href.appendChild(hrefA);
                     div.appendChild(href);
                     li.appendChild(div);
                     document.getElementById("gift-list").appendChild(li);
                     })
                 }
            }
        }
    },
    deleteIdea: function(ev){
        console.log("deleteIdea");
        let temp = JSON.parse(localStorage.getItem("giftr-grif0193"));
        temp.people.forEach(function (thisPerson, numb) {
            if (currentPerson == thisPerson.id) {
            thisPerson.ideas.forEach(function (idea, index) {
                if (idea.id == ev.currentTarget.getAttribute("id")) {
                    console.log(gift.id);
                    temp.people[numb].ideas.splice(index, 1);
                    temp = JSON.stringify(temp);
                    localStorage.setItem("giftr-grif0193", temp);
            }
        })
        }})
        app.showIdea();
    },
    
    getCurrentDOB: function(ev){
        let child = ev.currentTarget.parentElement;
        currentPerson = child.getAttribute("id");
        console.log(currentPerson);
    },
    getCurrent: function(ev){
        let child = ev.currentTarget.parentElement;
        let p = child.parentElement;
        currentPerson = p.getAttribute("id");
        console.log(currentPerson)
    },
    toggleModal: function(ev){
        let myEvent = new CustomEvent("touchend", { bubbles: true, cancelable: true })
        document.querySelector(".icon-close").dispatchEvent(myEvent);
    },
};

document.addEventListener("DOMContentLoaded", app.onDeviceReady);