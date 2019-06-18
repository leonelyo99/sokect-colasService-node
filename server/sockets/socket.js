const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback)=>{
        let siguiente = ticketControl.siguiente();
        console.log(`el siguiente es ${siguiente}`);
        callback(siguiente);
    });

    client.emit('estadoActual',{
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getultimos4()
    });

    client.on('atenderTicket',(data, callback)=>{
        if(!data.escritorio){
            return callback ({
                err:true,
                mensaje : 'escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        callback(atenderTicket);

        //actualizar que ya un escritorio tiene un ticket
        client.broadcast.emit('ultimos4',{
            ultimos4: ticketControl.getultimos4()
        });
    });
});