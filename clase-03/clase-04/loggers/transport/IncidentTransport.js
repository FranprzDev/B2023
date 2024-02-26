const { Transport } = require('winston')
const Incident = require('../../models/Incident')

// Crea tu clase de transporte personalizado que extiende de winston.Transport
class IncidentTransport extends Transport {
    constructor(opts) {
        super(opts)
    }

    // Override del método log() para personalizar el comportamiento del transporte
    log(info, callback) {
        if (info.level === 'error') {
            setImmediate(async () => {
                // Hacer algo con el registro 'info' aquí
                // info tiene propiedades como info.level, info.message, etc.
                const incident = new Incident({
                    message: {
                        date: new Date().toLocaleString(),
                        error: info.message
                    }
                })
                await incident.save()

                // Llama al callback después de que hayas procesado el registro
                callback()
            })
        }
    }
}

// Exporta tu transporte personalizado para su uso en Winston
module.exports = IncidentTransport
