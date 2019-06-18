const fs = require('fs');
class Ticket{
    constructor(numero, escritorio){
        this.numero = numero;
        this.escritorio = escritorio;
    }
}
class TicketControl{

    constructor(){
        //se inicia cuando inicializo la clase
        this.ultimo= 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimos4 = [];

        let data = require('../data/data.json');
        
        if(data.hoy === this.hoy){
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimos4 = data.ultimos4;
        }else{
            this.reiniciarConteo();
        }
    }

    siguiente(){
        this.ultimo += 1;

        let ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }
    
    getUltimoTicket(){
        return `Ticket ${this.ultimo}`;
    }
    getultimos4(){
        return this.ultimos4;
    }

    atenderTicket(escritorio){
        if(this.tickets.length === 0){
            return 'No hay ticekts';
        }
        
        let numeroTicket = this.tickets[0].numero;
        this.tickets.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        console.log(this.ultimos4);
        this.ultimos4.unshift(atenderTicket);

        if(this.ultimos4.length > 4){
            this.ultimos4.splice(-1,1); //borra el ultimo
        }

        console.log('ultminos 4', this.ultimos4);
        this.grabarArchivo();

        return atenderTicket;
    }

    reiniciarConteo(){
        this.ultimo = 0;
        this.tickets = [];
        this.ultimos4 = [];

        console.log('Se a inicializado el siistema');
        this.grabarArchivo();
    }

    grabarArchivo(){
        //creo el objeto y lo paso a json
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimos4: this.ultimos4
        };

        let jsonDataString = JSON.stringify(jsonData);

        //lo grabo en el archivo del json
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
}