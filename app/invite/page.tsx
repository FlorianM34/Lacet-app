import ConfirmButton from './ConfirmButton'

export default function InvitePage() {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Chez Florian</title>
        <style>{`
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #FDF0F4;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
            padding: 1rem;
          }
          .wrapper { width: 100%; max-width: 420px; }
          .mail-bg {
            background: #FBEAF0;
            padding: 2rem 1.25rem 2.5rem;
            border-radius: 16px;
            position: relative;
            overflow: hidden;
          }
          .deco-circle {
            position: absolute;
            border-radius: 50%;
            opacity: 0.45;
          }
          .mail-header {
            text-align: center;
            margin-bottom: 1.5rem;
            position: relative;
            z-index: 1;
          }
          .mail-header-title {
            font-family: Georgia, serif;
            font-size: 26px;
            font-weight: 400;
            font-style: italic;
            color: #72243E;
            letter-spacing: 0.02em;
          }
          .mail-header-sub {
            font-size: 11px;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            color: #993556;
            margin-top: 6px;
          }
          .cards-layout {
            display: flex;
            flex-direction: column;
            gap: 14px;
            position: relative;
            z-index: 1;
          }
          .card {
            border-radius: 16px;
            padding: 1rem 1.25rem;
          }
          .card-pink { background: #F4C0D1; }
          .card-teal { background: #9FE1CB; }
          .card-amber { background: #FAC775; }
          .card-purple { background: #CECBF6; }
          .card-white {
            background: #fff;
            border: 0.5px solid #F4C0D1;
          }
          .card-label {
            font-size: 10px;
            letter-spacing: 0.13em;
            text-transform: uppercase;
            font-weight: 500;
            margin-bottom: 6px;
          }
          .card-pink .card-label { color: #72243E; }
          .card-teal .card-label { color: #085041; }
          .card-amber .card-label { color: #633806; }
          .card-purple .card-label { color: #3C3489; }
          .card-white .card-label { color: #993556; }
          .card-value {
            font-family: Georgia, serif;
            font-size: 16px;
            font-style: italic;
          }
          .card-pink .card-value { color: #4B1528; }
          .card-teal .card-value { color: #04342C; }
          .card-amber .card-value { color: #412402; }
          .card-purple .card-value { color: #26215C; }
          .card-white .card-value { color: #72243E; }
          .card-row {
            display: flex;
            gap: 10px;
          }
          .card-row .card { flex: 1; }
          .card-row .card-pink { transform: rotate(-0.8deg); }
          .card-row .card-teal { transform: rotate(0.7deg); }
          .card-row .card-amber { transform: rotate(-0.5deg); }
          .menu-line {
            display: flex;
            align-items: baseline;
            gap: 10px;
            padding: 5px 0;
            border-bottom: 0.5px solid rgba(114,36,62,0.15);
          }
          .menu-line:last-child { border-bottom: none; }
          .menu-course {
            font-size: 10px;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: #3C3489;
            min-width: 56px;
          }
          .menu-dish {
            font-family: Georgia, serif;
            font-style: italic;
            font-size: 14px;
            color: #26215C;
          }
          .closing-card {
            background: #fff;
            border-radius: 16px;
            padding: 1.25rem;
            margin-left: 0.5rem;
            transform: rotate(-0.3deg);
            border: 0.5px solid #F4C0D1;
            font-size: 14px;
            color: #72243E;
            line-height: 1.85;
            position: relative;
            z-index: 1;
          }
          .closing-sig {
            font-family: Georgia, serif;
            font-size: 18px;
            font-style: italic;
            color: #4B1528;
            margin-top: 10px;
          }
          .pill {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            background: #CECBF6;
            color: #26215C;
            font-size: 12px;
            padding: 5px 14px;
            border-radius: 999px;
            margin-top: 4px;
          }
          .mail-footer {
            text-align: center;
            margin-top: 1.5rem;
            font-size: 11px;
            letter-spacing: 0.08em;
            color: #993556;
            position: relative;
            z-index: 1;
          }
        `}</style>
      </head>
      <body>
        <div className="wrapper">
          <div className="mail-bg">

            <div className="deco-circle" style={{width:'180px',height:'180px',background:'#ED93B1',top:'-60px',right:'-40px'}}></div>
            <div className="deco-circle" style={{width:'120px',height:'120px',background:'#9FE1CB',bottom:'-30px',left:'-30px'}}></div>
            <div className="deco-circle" style={{width:'80px',height:'80px',background:'#FAC775',bottom:'80px',right:'20px'}}></div>
            <div className="deco-circle" style={{width:'60px',height:'60px',background:'#AFA9EC',top:'120px',left:'-10px'}}></div>

            <div className="mail-header">
              <div className="mail-header-title">Chez Florian</div>
              <div className="mail-header-sub">Table privée · une soirée pour deux</div>
            </div>

            <div className="cards-layout">

              <div className="card-row" style={{position:'relative',zIndex:1}}>
                <div className="card card-pink">
                  <div className="card-label">Date</div>
                  <div className="card-value">Vendredi 17 avril</div>
                </div>
                <div className="card card-teal">
                  <div className="card-label">Heure</div>
                  <div className="card-value">18h30</div>
                </div>
                <div className="card card-amber">
                  <div className="card-label">Couverts</div>
                  <div className="card-value">2 personnes</div>
                </div>
              </div>

              <div className="card card-purple" style={{position:'relative',zIndex:1,marginLeft:'0',marginRight:'2rem',transform:'rotate(-0.8deg)'}}>
                <div className="card-label">Menu du soir</div>
                <div className="menu-line"><span className="menu-course">Entrée</span><span className="menu-dish">Surprise </span></div>
                <div className="menu-line"><span className="menu-course">Plat</span><span className="menu-dish">Un truc super bon et diète wallah </span></div>
                <div className="menu-line"><span className="menu-course">Dessert</span><span className="menu-dish">Y'aura du chocolat !</span></div>
              </div>

              <div className="card card-teal" style={{position:'relative',zIndex:1,marginLeft:'2rem',marginRight:'0',transform:'rotate(0.6deg)'}}>
                <div className="card-label">Boissons</div>
                <div className="pill">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                    <path d="M8 2C9.5 2 12 4 12 7C12 9.5 10.5 11 8 11C5.5 11 4 9.5 4 7C4 4 6.5 2 8 2Z" stroke="#04342C" strokeWidth="1.2" fill="none"/>
                    <line x1="8" y1="11" x2="8" y2="14" stroke="#04342C" strokeWidth="1.2"/>
                    <line x1="6" y1="14" x2="10" y2="14" stroke="#04342C" strokeWidth="1.2"/>
                  </svg>
                  Cocktails maison halal ou haram
                </div>
              </div>

              <ConfirmButton />

            </div>

            <div className="mail-footer">Réservation privée · Chez Florian · Montpellier</div>
          </div>
        </div>
      </body>
    </html>
  )
}
