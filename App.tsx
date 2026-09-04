import { useEffect, useState, type FormEvent } from 'react';
import {
  ArrowLeft, CalendarDays, Check, ChevronDown, Clock, Coffee, MapPin, Menu, Sparkles,
  UtensilsCrossed, Users, Waves, X,
} from 'lucide-react';

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingSent, setBookingSent] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ id: number; status: string } | null>(null);
  const [bookingError, setBookingError] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [roomName, setRoomName] = useState('جناح نوم وجلوس وتراس');
  const [contactSent, setContactSent] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 45);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    ['عن الفندق', '#about'],
    ['الغرف والأجنحة', '#rooms'],
    ['أماكن قريبة', '#experiences'],
    ['الصور', '#gallery'],
    ['تواصل معنا', '#contact'],
  ];
  const closeMenu = () => setMenuOpen(false);
  const today = getLocalDateValue();
  const bookingNights = countNights(arrivalDate, departureDate);
  const clearBookingError = () => {
    setBookingError('');
    setBookingSent(false);
    setBookingResult(null);
  };
  const handleBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBookingSent(false);
    setBookingError('');
    setBookingResult(null);

    if (!arrivalDate || !departureDate) {
      setBookingError('يرجى اختيار Check in وCheck out.');
      return;
    }

    const nights = countNights(arrivalDate, departureDate);

    if (!Number.isFinite(nights) || nights < 1) {
      setBookingError('يجب أن يكون Check out بعد Check in بليلة واحدة على الأقل.');
      return;
    }

    setBookingSent(true);
    setBookingResult({ id: Math.floor(1000 + Math.random() * 9000), status: 'pending' });
  };
  const handleContact = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setContactSent(true);
  };

  const rooms = [
    {
      title: 'غرفتان، في كل غرفة سريران',
      description: 'غرفتان منفصلتان، تحتوي كل غرفة منهما على سريرين.',
      meta: 'عدد الغرف: ٢ · سريران في كل غرفة',
      view: 'غرف عادية',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=84',
      large: true,
    },
    {
      title: 'أجنحة مع غرفة نوم وغرفة جلوس وتراس',
      description: 'أربعة أجنحة، يتكوّن كل جناح منها من غرفة نوم وغرفة جلوس وتراس.',
      meta: 'عدد الأجنحة: ٤ · نوم + جلوس + تراس',
      view: 'أجنحة بدون إطلالة على الناعورة',
      image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=84',
    },
    {
      title: 'جناح بإطلالة على الناعورة وبلكونة',
      description: 'جناحان يطلان على الناعورة، ويحتوي كل جناح على بلكونة.',
      meta: 'عدد الأجنحة: ٢ · إطلالة + بلكونة',
      view: 'إطلالة على الناعورة',
      image: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=84',
    },
    {
      title: 'جناح بإطلالة على الناعورة وتراس',
      description: 'جناحان يطلان على الناعورة، ويحتوي كل جناح على تراس.',
      meta: 'عدد الأجنحة: ٢ · إطلالة + تراس',
      view: 'إطلالة على الناعورة',
      image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=84',
    },
  ];
  const amenities = [
    [Waves, 'مسبح المرسى', 'ماء صافٍ يمتد بمحاذاة الأفق، مفتوح من الفجر حتى آخر ضوء.'],
    [UtensilsCrossed, 'مائدة River Hotel', 'أطباق محلية مستوحاة من نكهات حماة ومكونات الموسم.'],
    [Sparkles, 'جلسة استرخاء', 'مساحة هادئة لتستعيد إيقاعك بعد يوم من اكتشاف المدينة.'],
    [Coffee, 'مجلس النهر', 'قهوة عربية على مهل، وإطلالة هادئة قرب باب النهر.'],
  ];
  const experiences = [
    ['نزهة عند الغروب', 'باب النهر', 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1300&q=84'],
    ['سوق الصباح', 'حماة القديمة', 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=84'],
    ['طاولة على الرمل', 'عشاء خاص', 'https://images.unsplash.com/photo-1530569673472-307dc017a7d6?auto=format&fit=crop&w=900&q=84'],
    ['ممشى النهر', 'مشي وتأمل', 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=84'],
    ['تجربة من حماة', 'تجربة محلية', 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1000&q=84'],
  ];
  const gallery = [
    'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1100&q=84',
    'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=84',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=900&q=84',
    'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1100&q=84',
    'https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=900&q=84',
  ];

  return (
    <div className="hotel-page" dir="rtl">
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="section-wrap header-inner">
          <a href="#top" className="brand" data-testid="link-brand" onClick={closeMenu}>
            <img className="brand-mark brand-logo-mark" src={`${import.meta.env.BASE_URL}river-logo.jpg`} alt="" />
            <span className="brand-copy"><strong>River Hotel</strong><small>ضيافة على النهر</small></span>
          </a>
          <nav className="desktop-nav" aria-label="التنقل الرئيسي">
            {navItems.map(([label, href]) => <a href={href} key={href} data-testid={`link-nav-${href.slice(1)}`}>{label}</a>)}
          </nav>
          <span className="header-phone"><MapPin size={15} /> حماة، سورية · حي باب النهر</span>
          <button className="menu-button" type="button" aria-label={menuOpen ? 'إغلاق القائمة' : 'فتح القائمة'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="button-mobile-menu">
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
          {menuOpen && <nav className="mobile-menu" aria-label="قائمة الهاتف">
            {navItems.map(([label, href]) => <a href={href} key={href} onClick={closeMenu} data-testid={`link-mobile-${href.slice(1)}`}>{label}</a>)}
          </nav>}
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-content">
            <div className="hero-kicker reveal">سورية · حماة · حي باب النهر</div>
            <h1 id="hero-title" className="reveal delay-1">إقامة مريحة<br />في حماة.</h1>
            <p className="reveal delay-2">مرحباً بكم في River Hotel، فندق هادئ في حي باب النهر بمدينة حماة.</p>
            <div className="hero-actions reveal delay-3">
              <a href="#booking" className="button-primary" data-testid="link-hero-book">احجز الآن <ArrowLeft size={17} /></a>
              <a href="#about" className="button-quiet" data-testid="link-hero-discover">تعرّف على الفندق <ChevronDown size={17} /></a>
            </div>
          </div>
          <div className="hero-note">River Hotel · حي باب النهر</div>
        </section>

        <section className="booking-bar" id="booking" aria-label="طلب حجز">
          <form onSubmit={handleBooking}>
              <div className="booking-grid">
               <div className="field"><label htmlFor="departure">Check out</label><input id="departure" type="date" min={arrivalDate || today} required value={departureDate} onChange={(event) => { setDepartureDate(event.target.value); clearBookingError(); }} data-testid="input-departure" /></div>
               <div className="field"><label htmlFor="arrival">Check in</label><input id="arrival" type="date" min={today} required value={arrivalDate} onChange={(event) => { setArrivalDate(event.target.value); clearBookingError(); }} data-testid="input-arrival" /></div>
               <div className="field nights-field"><label htmlFor="nights">عدد الليالي</label><output id="nights" className="nights-value" aria-live="polite" data-testid="output-nights">{bookingNights > 0 ? `${bookingNights} ليلة` : 'يُحسب تلقائياً'}</output></div>
               <div className="field"><label htmlFor="guests">عدد الضيوف</label><select id="guests" value={guests} onChange={(event) => { setGuests(event.target.value); clearBookingError(); }} data-testid="select-guests"><option value="1">ضيف واحد</option><option value="2">ضيفان</option><option value="3">٣ ضيوف</option><option value="4">٤ ضيوف</option></select></div>
               <div className="field"><label htmlFor="stay-type">نوع الغرفة أو الجناح</label><select id="stay-type" value={roomName} onChange={(event) => { setRoomName(event.target.value); clearBookingError(); }} data-testid="select-stay-type"><option value="غرفة بسريرين">غرفة بسريرين · غرفتان</option><option value="جناح نوم وجلوس وتراس">جناح نوم وجلوس وتراس · ٤ أجنحة</option><option value="جناح الناعورة مع بلكونة">جناح الناعورة مع بلكونة · جناحان</option><option value="جناح الناعورة مع تراس">جناح الناعورة مع تراس · جناحان</option></select></div>
              <button className="button-primary" type="submit" disabled={false} data-testid="button-booking-submit">أرسل طلب الحجز <ArrowLeft size={16} /></button>
            </div>
             {bookingSent && bookingResult && <div className="booking-confirmation form-note booking-success" role="status" data-testid="status-booking-success"><Check size={16} /> وصل طلبك بنجاح. المرجع #{bookingResult.id} · <strong>{roomName}</strong> · من {formatArabicDate(arrivalDate)} إلى {formatArabicDate(departureDate)} · {bookingNights} {bookingNights === 1 ? 'ليلة' : 'ليالٍ'} · {guests} ضيوف · الحالة: {statusLabels[bookingResult.status as keyof typeof statusLabels] ?? 'قيد المراجعة'}</div>}
            {bookingError && <div className="form-note booking-error" role="alert" data-testid="status-booking-error">{bookingError}</div>}
          </form>
        </section>

        <section className="intro" id="about" aria-labelledby="about-title">
          <div className="section-wrap intro-grid">
            <div className="intro-copy">
              <div className="eyebrow">عن الفندق</div>
              <h2 id="about-title">إقامة مريحة،<br />في قلب حماة.</h2>
              <p>يضم River Hotel عشر وحدات إقامة: غرفتين، في كل غرفة سريران، وثمانية أجنحة موزعة بين الأجنحة ذات التراس والأجنحة المطلة على الناعورة.</p>
              <a href="#rooms" className="text-link" data-testid="link-about-rooms">شاهد الغرف والأجنحة <ArrowLeft size={17} /></a>
            </div>
            <div className="intro-art">
              <img className="intro-image" src="https://images.unsplash.com/photo-1544986581-efac024faf62?auto=format&fit=crop&w=1100&q=84" alt="فناء معماري هادئ تحيط به النباتات" />
              <div className="logo-card"><img src={`${import.meta.env.BASE_URL}river-logo.jpg`} alt="شعار River Hotel" /></div>
              <div className="intro-stamp">١٠ وحدات<br />إقامة فقط</div>
              <div className="intro-caption">River Hotel · حماة</div>
            </div>
          </div>
        </section>

        <section className="rooms" id="rooms" aria-labelledby="rooms-title">
          <div className="section-wrap">
            <div className="section-heading">
              <div><div className="eyebrow">الغرف والأجنحة</div><h2 id="rooms-title">اختر مكان<br />إقامتك.</h2></div>
              <p>لدينا غرفتان بسريرين وثمانية أجنحة. تعرّف على كل نوع ومزاياه قبل إرسال طلب الحجز.</p>
            </div>
            <div className="room-list">
              {rooms.map((room, index) => <article className={`room-card ${room.large ? 'large' : 'small'}`} key={room.title}>
                <img src={room.image} alt={room.title} loading="lazy" />
                <div className="room-details">
                  <h3>{room.title}</h3><p>{room.description}</p><div className="room-meta"><span>{room.meta}</span><span>{room.view}</span></div>
                  {room.large && <a href="#booking" className="text-link" data-testid={`link-room-${index}`}>اطلب هذا النوع <ArrowLeft size={15} /></a>}
                </div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="amenities" aria-labelledby="amenities-title">
          <div className="section-wrap">
            <div className="section-heading">
              <div><div className="eyebrow">خدمات الفندق</div><h2 id="amenities-title">كل ما تحتاجه،<br />لإقامة مريحة.</h2></div>
              <p>خدمات بسيطة ومريحة تساعدك على الاستمتاع بإقامتك في River Hotel.</p>
            </div>
            <div className="amenity-grid">
              {amenities.map(([Icon, title, copy], index) => <article className="amenity" key={title as string} data-testid={`card-amenity-${index}`}>
                {typeof Icon === 'function' && <Icon size={24} strokeWidth={1.4} />}
                <h3>{title as string}</h3><p>{copy as string}</p>
              </article>)}
            </div>
          </div>
        </section>

        <section className="experiences" id="experiences" aria-labelledby="experiences-title">
          <div className="section-wrap">
            <div className="section-heading">
              <div><div className="eyebrow">أماكن قريبة</div><h2 id="experiences-title">اكتشف<br />حماة.</h2></div>
              <p>أماكن وتجارب قريبة من الفندق في حي باب النهر ومدينة حماة.</p>
            </div>
            <div className="experience-grid">
              {experiences.map(([title, location, image], index) => <article className="experience" key={title}>
                <img src={image} alt={title} loading="lazy" />
                <div className="experience-label"><strong>{title}</strong><span>{location}</span></div>
              </article>)}
            </div>
          </div>
        </section>

        <section className="gallery" id="gallery" aria-labelledby="gallery-title">
          <div className="section-wrap">
            <div className="gallery-head"><div><div className="eyebrow">صور الفندق</div><h2 id="gallery-title">شاهد المكان.</h2></div><span className="eyebrow">صورة ٠١ من ٠٥</span></div>
            <div className="gallery-mosaic">
              {gallery.map((image, index) => <figure key={image} onClick={() => setActiveImage(index)} onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') setActiveImage(index); }} tabIndex={0} role="button" aria-label={`عرض صورة ${index + 1} من معرض River Hotel`} className={activeImage === index ? 'active' : ''} data-testid={`image-gallery-${index}`}><img src={image} alt={`تفاصيل من River Hotel ${index + 1}`} loading="lazy" /></figure>)}
            </div>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="section-wrap contact-grid">
            <div>
               <div className="eyebrow">تواصل معنا</div>
               <h2 id="contact-title">هل لديك<br />سؤال؟</h2>
               <p className="contact-intro">أرسل سؤالك أو طلب الحجز، وسيرد عليك فريق River Hotel في حماة.</p>
              <div className="contact-details">
                 <span className="contact-detail"><MapPin size={17} /> سورية، حماة، حي باب النهر</span>
                 <span className="contact-detail"><Waves size={17} /> ١٠ وحدات إقامة · ٨ أجنحة</span>
              </div>
            </div>
            <form className="contact-form" onSubmit={handleContact}>
              <h3>أرسل لنا رسالة</h3>
              <div className="contact-form-grid">
                <div className="field"><label htmlFor="name">الاسم</label><input id="name" name="name" required placeholder="اكتب اسمك" data-testid="input-contact-name" /></div>
                <div className="field"><label htmlFor="email">البريد الإلكتروني</label><input id="email" name="email" required type="email" placeholder="you@example.com" data-testid="input-contact-email" /></div>
                <div className="field full"><label htmlFor="message">الرسالة</label><textarea id="message" name="message" required placeholder="اكتب سؤالك أو طلب الحجز" data-testid="input-contact-message" /></div>
              </div>
              <button className="button-primary" type="submit" data-testid="button-contact-submit">إرسال الرسالة <ArrowLeft size={16} /></button>
               {contactSent && <div className="success-message" role="status" data-testid="status-contact-success"><Check size={17} /> شكراً، وصلت رسالتك إلى فريق River Hotel.</div>}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap">
          <div className="footer-top">
             <a href="#top" className="brand" data-testid="link-footer-brand"><img className="brand-mark brand-logo-mark" src={`${import.meta.env.BASE_URL}river-logo.jpg`} alt="" /><span className="brand-copy"><strong>River Hotel</strong><small>ضيافة على النهر</small></span></a>
            <nav className="footer-links" aria-label="روابط التذييل">{navItems.map(([label, href]) => <a href={href} key={href} data-testid={`link-footer-${href.slice(1)}`}>{label}</a>)}</nav>
          </div>
            <div className="footer-bottom"><span>© River Hotel. جميع الحقوق محفوظة.</span><span>سورية، حماة · حي باب النهر</span><a href="/admin" data-testid="link-admin">دخول فريق الفندق</a></div>
        </div>
      </footer>
    </div>
  );
}


function App() {
  return <Home />;
}

export default App;
