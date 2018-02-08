module.exports = {
    "iceServers": [
      {
        'urls': 'stun:global.stun.twilio.com:3478?transport=udp'
      }, {
        "urls": "stun:stun.l.google.com:19302"
      }, {
        "urls": "stun:stun.stunprotocol.org:3478"
      }, {
        "urls": ["stun:stun2.l.google.com:19302", "stun:stun1.l.google.com:19302", "stun:stun3.l.google.com:19302", "stun:stun4.l.google.com:19302"]
      },{
        "urls": "stun:stun.services.mozilla.com:3478"
      }
    ]
  }