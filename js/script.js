(function readyJS(win, doc){
    'use strict';

    let tabela = doc.querySelector('.tabela-crud');
    let form = doc.querySelector('#formCadastro');
    let result = doc.querySelector('.resultado');

    let ajax =new XMLHttpRequest();
    function selectDB(){
        //let params='id='+id.value;
        ajax.open('GET','http://localhost:3000/select');
        ajax.onreadystatechange=function(){
            if(ajax.status === 200 && ajax.readyState === 4){
                let res = JSON.parse(ajax.responseText);
                let estrutura = `<tr>
                        <td>Nome</td>
                        <td>Email</td>
                        <td>Comentário</td>
                        <td>Acões</td>
                    </tr>`;
                for(let i=0; i<res.length; i++){
                    estrutura +=`<tr>
                        <td>${res[i].Nome}</td>
                        <td>${res[i].Email}</td>
                        <td>${res[i].Comentario}</td>
                        <td>
                            <a href='/select.html/${res[i].Id}'>Ver</a>
                            <a href='/update/${res[i].Id}'>Editar</a>
                            <a class='deletar' href='/deletar.html/${res[i].Id}'>Deletar</a>
                        </td>
                    </tr>`;
                }
                tabela.innerHTML=estrutura;
            }
        }
        ajax.send();
    }

    function sendForm(event){
        event.preventDefault();
        let ajax = new XMLHttpRequest();
        let params='id='+id.value && 'name='+this.name.value && 'email='+email.value && 'comentario='+comentario.value;
        //let params=JSON.stringify({id: id.value, name: this.name.value, email: email.value, comentario: comentario.value});
        ajax.open('POST','http://localhost:3000/controllerForm');
        ajax.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        ajax.onreadystatechange=function(){
            if(ajax.status === 200 && ajax.readyState === 4){
                result.classList.add("show");
                result.innerHTML = ajax.responseText;
            }
        }
        console.log(params);
        ajax.send(params);
    }

    if(tabela){
        selectDB();
    }
    if(form){
        form.addEventListener('submit', sendForm, false);
    }


    if(doc.querySelectorAll('.deletar')){
        for(let i=0; i<doc.querySelectorAll('.deletar').length; i++){
            doc.querySelectorAll('.deletar')[i].addEventListener('click',function(event){
                if(confirm("Deseja mesmo apagar este dado?")){
                    return true;
                }
                else{
                    event.preventDefault();
                }
            });
        }
    }

})(window,document);