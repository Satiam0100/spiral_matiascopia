import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../styles/bookNow.module.css';

const CASA_LOGO_WHITE =
  '/images/spiral%20logos/SPIRAL%20Logos/Casa%20Spiral/Casa.spiral-white.png';

const HERO_IMAGE = '/images/photos/DSC01989.jpg';
const BOOK_EMAIL = 'andrea@spiralmstudio.com';

const carouselSlides = [
  '/images/photos/DSC02380.jpg',
  '/images/photos/DSC02040.jpg',
  '/images/photos/DSC01963.jpg',
  '/images/photos/DSC04163.jpg',
];

const rates = [
  { hours: 2, weekday: 160, weekend: 170 },
  { hours: 3, weekday: 240, weekend: 245 },
  { hours: 4, weekday: 320, weekend: 330 },
  { hours: 5, weekday: 390, weekend: 395 },
  { hours: 6, weekday: 460, weekend: 465 },
  { hours: 7, weekday: 530, weekend: 530 },
  { hours: 8, weekday: 600, weekend: 600 },
];

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const dayHeaders = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

const startOfMonth = (d) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d, delta) => new Date(d.getFullYear(), d.getMonth() + delta, 1);
const isSameDay = (a, b) =>
  !!a &&
  !!b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isWeekend = (d) => {
  const dow = d.getDay(); // 0=Sun..6=Sat
  return dow === 0 || dow === 6;
};

const isValidEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

const normalizePhoneDigits = (value) => value.replace(/[^\d]/g, '');

const preloadImage = async (src) => {
  if (!src) return false;
  try {
    const img = new Image();
    img.src = src;
    if (img.decode) {
      await img.decode();
      return true;
    }
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    return true;
  } catch {
    return false;
  }
};

const getMonthGrid = (monthDate) => {
  const first = startOfMonth(monthDate);
  const daysInMonth = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const jsDow = first.getDay(); // 0=Sun..6=Sat
  const mondayIndex = (jsDow + 6) % 7; // 0=Mon..6=Sun

  const cells = [];
  for (let i = 0; i < mondayIndex; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(first.getFullYear(), first.getMonth(), day));
  }
  while (cells.length % 7 !== 0) cells.push(null);

  const weeks = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return weeks;
};

const BookNowModule = () => {
  const [slideIdx, setSlideIdx] = useState(0);
  const [activePlan, setActivePlan] = useState(null); // 'weekday' | 'weekend' | null
  const [hours, setHours] = useState(2);
  const [month, setMonth] = useState(() => startOfMonth(new Date()));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const slideCount = carouselSlides.length;
  const activeSlide = carouselSlides[slideIdx] ?? carouselSlides[0];
  const loadedSlidesRef = useRef(new Set());
  const [renderedSlide, setRenderedSlide] = useState(activeSlide);
  const [incomingSlide, setIncomingSlide] = useState(null);
  const [isCarouselLoading, setIsCarouselLoading] = useState(false);
  const goPrev = () => setSlideIdx((i) => (i - 1 + slideCount) % slideCount);
  const goNext = () => setSlideIdx((i) => (i + 1) % slideCount);

  useEffect(() => {
    // Preload above-the-fold imagery as early as possible.
    preloadImage(HERO_IMAGE);
    preloadImage(carouselSlides[0]);

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(
          () => {
            carouselSlides.forEach((src) => {
              if (!loadedSlidesRef.current.has(src)) {
                preloadImage(src).then((ok) => {
                  if (ok) loadedSlidesRef.current.add(src);
                });
              }
            });
          },
          { timeout: 1800 }
        )
      : window.setTimeout(() => {
          carouselSlides.forEach((src) => {
            if (!loadedSlidesRef.current.has(src)) {
              preloadImage(src).then((ok) => {
                if (ok) loadedSlidesRef.current.add(src);
              });
            }
          });
        }, 900);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let fadeTimer = null;

    const current = activeSlide;
    const next = carouselSlides[(slideIdx + 1) % slideCount];
    const prev = carouselSlides[(slideIdx - 1 + slideCount) % slideCount];

    [current, next, prev].forEach((src) => {
      if (!src || loadedSlidesRef.current.has(src)) return;
      preloadImage(src).then((ok) => {
        if (ok) loadedSlidesRef.current.add(src);
      });
    });

    if (!current || renderedSlide === current) return () => {};
    setIsCarouselLoading(true);

    preloadImage(current).then((ok) => {
      if (cancelled) return;
      if (ok) loadedSlidesRef.current.add(current);
      setIncomingSlide(current);
      // Let the browser paint the new layer before transitioning opacity.
      window.requestAnimationFrame(() => {
        if (cancelled) return;
        setRenderedSlide(current);
        setIsCarouselLoading(false);
      });

      fadeTimer = window.setTimeout(() => {
        if (cancelled) return;
        setIncomingSlide(null);
      }, 320);
    });

    return () => {
      cancelled = true;
      if (fadeTimer) window.clearTimeout(fadeTimer);
    };
  }, [activeSlide, renderedSlide, slideIdx, slideCount]);

  const money = useMemo(
    () =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }),
    []
  );

  const togglePlan = (plan) => {
    setActivePlan((p) => (p === plan ? null : plan));
    setSelectedTime(null);
    setSelectedDate(null);
    setSubmitAttempted(false);
  };

  const price = useMemo(() => {
    const entry = rates.find((r) => r.hours === hours) ?? rates[0];
    if (!entry) return 0;
    if (activePlan === 'weekend') return entry.weekend;
    return entry.weekday;
  }, [activePlan, hours]);

  const mailtoHref = useMemo(() => {
    const planLabel = activePlan === 'weekend' ? 'Weekend' : 'Weekday';
    const subject = `Studio Rental - ${planLabel}`;
    const dateText = selectedDate ? selectedDate.toDateString() : '(not selected)';
    const timeText = selectedTime ?? '(not selected)';
    const { firstName, lastName, phone, email } = formValues;

    const body = [
      'Hi Spiral,',
      '',
      "I'd like to book the studio.",
      `Plan: ${planLabel}`,
      `Hours: ${hours}`,
      `Date: ${dateText}`,
      `Time: ${timeText}`,
      '',
      'My information:',
      `First name: ${firstName || '(not provided)'}`,
      `Last name: ${lastName || '(not provided)'}`,
      `Phone number: ${phone || '(not provided)'}`,
      `Email: ${email || '(not provided)'}`,
      '',
      'Thanks!',
    ].join('\n');

    return `mailto:${BOOK_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }, [activePlan, formValues, hours, selectedDate, selectedTime]);

  const monthWeeks = useMemo(() => getMonthGrid(month), [month]);

  const validation = useMemo(() => {
    const errors = {};

    if (!activePlan) errors.activePlan = 'Selecciona un plan (Weekday o Weekend).';
    if (!selectedDate) errors.selectedDate = 'Selecciona una fecha.';
    if (!selectedTime) errors.selectedTime = 'Selecciona una hora.';

    const firstName = formValues.firstName.trim();
    const lastName = formValues.lastName.trim();
    const email = formValues.email.trim();
    const phoneDigits = normalizePhoneDigits(formValues.phone);

    if (!firstName) errors.firstName = 'Ingresa tu nombre.';
    if (!lastName) errors.lastName = 'Ingresa tu apellido.';

    if (!email) errors.email = 'Ingresa tu email.';
    else if (!isValidEmail(email)) errors.email = 'Ingresa un email válido.';

    if (!phoneDigits) errors.phone = 'Ingresa tu teléfono.';
    else if (phoneDigits.length < 10) errors.phone = 'Ingresa un teléfono válido (mín. 10 dígitos).';

    return { errors, isValid: Object.keys(errors).length === 0 };
  }, [activePlan, formValues, selectedDate, selectedTime]);

  const showErrors = submitAttempted;

  const onContinue = () => {
    setSubmitAttempted(true);
    if (!validation.isValid) return;
    window.location.href = mailtoHref;
  };

  const timeSlots = useMemo(
    () => [
      '7:00 AM',
      '8:00 AM',
      '9:00 AM',
      '10:00 AM',
      '11:00 AM',
      '12:00 PM',
      '1:00 PM',
      '2:00 PM',
      '3:00 PM',
      '4:00 PM',
      '5:00 PM',
      '6:00 PM',
      '7:00 PM',
      '8:00 PM',
      '9:00 PM',
      '10:00 PM',
    ],
    []
  );

  const BookingSlide = ({ plan }) => {
    const isOpen = activePlan === plan;
    const planTitle = plan === 'weekday' ? 'STUDIO RENTAL WEEKDAY' : 'STUDIO RENTAL WEEKEND';

    return (
      <section
        className={`${styles.bookingSlide} ${isOpen ? styles.bookingSlideOpen : ''}`}
        aria-label="Booking details"
        aria-hidden={!isOpen}
      >
        <div className={styles.bookingSlideInner}>
          <div className={styles.bookingSlideContent}>
            <div className={styles.bookingTopTitle}>{planTitle}</div>

            <div className={styles.bookingMeta}>
              <div className={styles.bookingMetaLeft}>
                <label className={styles.hoursRow}>
                  <select
                    className={styles.hoursSelect}
                    value={hours}
                    onChange={(e) => setHours(Number(e.target.value))}
                    aria-label="Select hours"
                  >
                    {rates.map((r) => (
                      <option key={r.hours} value={r.hours}>
                        {r.hours} HOURS
                      </option>
                    ))}
                  </select>
                  <span className={styles.hoursSuffix}>STUDIO RENTAL</span>
                </label>
              </div>

              <div className={styles.bookingPrice} aria-label="Price">
                {money.format(price)}
              </div>
            </div>

            <p className={styles.bookingDesc}>
              Private access to CASA STUDIO including all sets, props, and professional lighting
              equipment.
            </p>

            <div className={styles.bookingPickers}>
              <div className={styles.calendarCard} aria-label="Calendar">
                <div className={styles.calendarHeader}>
                  <button
                    type="button"
                    className={styles.calendarNav}
                    onClick={() => setMonth((m) => addMonths(m, -1))}
                    aria-label="Previous month"
                  >
                    ‹
                  </button>
                  <div className={styles.calendarMonth}>
                    {monthNames[month.getMonth()]} {month.getFullYear()}
                  </div>
                  <button
                    type="button"
                    className={styles.calendarNav}
                    onClick={() => setMonth((m) => addMonths(m, 1))}
                    aria-label="Next month"
                  >
                    ›
                  </button>
                </div>

                <div className={styles.calendarGrid} role="grid" aria-label="Month days">
                  {dayHeaders.map((d) => (
                    <div key={d} className={styles.calendarDow} aria-hidden="true">
                      {d}
                    </div>
                  ))}
                  {monthWeeks.flat().map((cell, idx) => {
                    if (!cell) {
                      return <div key={`empty-${idx}`} className={styles.calendarCellEmpty} />;
                    }
                    const selected = isSameDay(cell, selectedDate);
                    const allowed = plan === 'weekend' ? isWeekend(cell) : !isWeekend(cell);
                    return (
                      <button
                        key={cell.toISOString()}
                        type="button"
                        className={`${styles.calendarCell} ${
                          selected ? styles.calendarCellSelected : ''
                        } ${!allowed ? styles.calendarCellDisabled : ''}`}
                        onClick={() => setSelectedDate(cell)}
                        aria-label={`Select ${cell.toDateString()}`}
                        aria-pressed={selected}
                        disabled={!allowed}
                      >
                        {cell.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={styles.timeCard} aria-label="Time slots">
              <div className={styles.timeHeader}>
                <div className={styles.timeTitle}>
                  {selectedDate
                    ? selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Select a date'}
                </div>
                <div className={styles.timeZone}>TIME ZONE: EASTERN TIME (GMT-05:00)</div>
              </div>

              <div className={styles.timeGrid} role="list">
                {timeSlots.map((t) => {
                  const active = t === selectedTime;
                  return (
                    <button
                      key={t}
                      type="button"
                      className={`${styles.timeSlot} ${active ? styles.timeSlotActive : ''}`}
                      onClick={() => setSelectedTime(t)}
                      disabled={!selectedDate}
                      aria-pressed={active}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

            <div className={styles.infoBlock} aria-label="Your information">
              <div className={styles.infoTitle}>YOUR INFORMATION</div>

              <div className={styles.infoForm}>
                <label className={styles.fieldRow}>
                  <span className={styles.fieldLabel}>FIRST NAME</span>
                  <div className={styles.fieldControl}>
                    <input
                      className={`${styles.fieldInput} ${
                        showErrors && validation.errors.firstName ? styles.fieldInputError : ''
                      }`}
                      type="text"
                      name="firstName"
                      value={formValues.firstName}
                      onChange={(e) =>
                        setFormValues((v) => ({
                          ...v,
                          firstName: e.target.value,
                        }))
                      }
                      aria-invalid={showErrors && !!validation.errors.firstName}
                      aria-describedby={
                        validation.errors.firstName ? 'booknow-firstname-error' : undefined
                      }
                      autoComplete="given-name"
                    />
                    {showErrors && validation.errors.firstName ? (
                      <div id="booknow-firstname-error" className={styles.fieldError} role="alert">
                        {validation.errors.firstName}
                      </div>
                    ) : null}
                  </div>
                </label>
              <label className={styles.fieldRow}>
                <span className={styles.fieldLabel}>LAST NAME</span>
                <div className={styles.fieldControl}>
                  <input
                    className={`${styles.fieldInput} ${
                      showErrors && validation.errors.lastName ? styles.fieldInputError : ''
                    }`}
                    type="text"
                    name="lastName"
                    value={formValues.lastName}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        lastName: e.target.value,
                      }))
                    }
                    aria-invalid={showErrors && !!validation.errors.lastName}
                    aria-describedby={
                      validation.errors.lastName ? 'booknow-lastname-error' : undefined
                    }
                    autoComplete="family-name"
                  />
                  {showErrors && validation.errors.lastName ? (
                    <div id="booknow-lastname-error" className={styles.fieldError} role="alert">
                      {validation.errors.lastName}
                    </div>
                  ) : null}
                </div>
              </label>
              <label className={styles.fieldRow}>
                <span className={styles.fieldLabel}>PHONE NUMBER</span>
                <div className={styles.fieldControl}>
                  <input
                    className={`${styles.fieldInput} ${
                      showErrors && validation.errors.phone ? styles.fieldInputError : ''
                    }`}
                    type="tel"
                    name="phone"
                    value={formValues.phone}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        phone: e.target.value,
                      }))
                    }
                    aria-invalid={showErrors && !!validation.errors.phone}
                    aria-describedby={validation.errors.phone ? 'booknow-phone-error' : undefined}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  {showErrors && validation.errors.phone ? (
                    <div id="booknow-phone-error" className={styles.fieldError} role="alert">
                      {validation.errors.phone}
                    </div>
                  ) : null}
                </div>
              </label>
              <label className={styles.fieldRow}>
                <span className={styles.fieldLabel}>EMAIL</span>
                <div className={styles.fieldControl}>
                  <input
                    className={`${styles.fieldInput} ${
                      showErrors && validation.errors.email ? styles.fieldInputError : ''
                    }`}
                    type="email"
                    name="email"
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues((v) => ({
                        ...v,
                        email: e.target.value,
                      }))
                    }
                    aria-invalid={showErrors && !!validation.errors.email}
                    aria-describedby={validation.errors.email ? 'booknow-email-error' : undefined}
                    autoComplete="email"
                    inputMode="email"
                  />
                  {showErrors && validation.errors.email ? (
                    <div id="booknow-email-error" className={styles.fieldError} role="alert">
                      {validation.errors.email}
                    </div>
                  ) : null}
                </div>
              </label>
            </div>

              {showErrors &&
              (validation.errors.activePlan ||
                validation.errors.selectedDate ||
                validation.errors.selectedTime) ? (
                <div className={styles.formSummaryError} role="alert">
                  {validation.errors.activePlan ??
                    validation.errors.selectedDate ??
                    validation.errors.selectedTime}
                </div>
              ) : null}

              <button
                type="button"
                className={styles.continueButton}
                onClick={onContinue}
                disabled={!validation.isValid}
              >
                CONTINUE TO PAYMENT
              </button>

              <a className={styles.bookingEmail} href={mailtoHref}>
                {BOOK_EMAIL.toUpperCase()}
              </a>
            </div>
          </div>
      </section>
    );
  };

  return (
    <section className={styles.page} aria-label="Book now page">
      <section
        className={styles.hero}
        aria-label="Book Now hero"
        style={{ backgroundImage: `url(${HERO_IMAGE})` }}
      >
        <div className={styles.heroOverlay} aria-hidden />
        <img
          className={styles.heroLogo}
          src={CASA_LOGO_WHITE}
          alt="CASA SPIRAL"
          loading="eager"
          decoding="async"
        />
      </section>

      <section className={styles.bookNow} aria-label="Book the studio">
        <div className={styles.titleBar}>
          <h1 className={styles.title}>BOOK THE STUDIO</h1>
        </div>

        <div className={styles.panel}>
          <div className={styles.row}>
            <button
              type="button"
              className={`${styles.label} ${styles.labelButton}`}
              onClick={() => togglePlan('weekday')}
              aria-expanded={activePlan === 'weekday'}
            >
              STUDIO RENTAL&nbsp;&nbsp;WEEKDAY
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={() => togglePlan('weekday')}
              aria-expanded={activePlan === 'weekday'}
            >
              BOOK NOW!
            </button>
          </div>

          <BookingSlide plan="weekday" />

          <div className={styles.divider} aria-hidden />

          <div className={styles.row}>
            <button
              type="button"
              className={`${styles.label} ${styles.labelButton}`}
              onClick={() => togglePlan('weekend')}
              aria-expanded={activePlan === 'weekend'}
            >
              STUDIO RENTAL&nbsp;&nbsp;WEEKEND
            </button>
            <button
              type="button"
              className={styles.button}
              onClick={() => togglePlan('weekend')}
              aria-expanded={activePlan === 'weekend'}
            >
              BOOK NOW!
            </button>
          </div>

          <BookingSlide plan="weekend" />
        </div>
      </section>

      <section className={styles.carouselWrap} aria-label="Studio carousel">
        <div className={styles.carousel}>
          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowLeft}`}
            onClick={goPrev}
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div
            className={`${styles.carouselStage} ${
              isCarouselLoading ? styles.carouselStageLoading : ''
            }`}
            aria-label="Carousel image"
            aria-busy={isCarouselLoading}
          >
            <div
              className={styles.carouselLayer}
              style={{ backgroundImage: `url(${renderedSlide})` }}
              aria-hidden="true"
            />
            {incomingSlide ? (
              <div
                className={`${styles.carouselLayer} ${styles.carouselLayerIncoming}`}
                style={{ backgroundImage: `url(${incomingSlide})` }}
                aria-hidden="true"
              />
            ) : null}
          </div>

          <button
            type="button"
            className={`${styles.carouselArrow} ${styles.carouselArrowRight}`}
            onClick={goNext}
            aria-label="Next photo"
          >
            ›
          </button>

          <div className={styles.carouselDots} role="tablist" aria-label="Carousel dots">
            {carouselSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.carouselDot} ${
                  idx === slideIdx ? styles.carouselDotActive : ''
                }`}
                onClick={() => setSlideIdx(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-selected={idx === slideIdx}
                role="tab"
              />
            ))}
          </div>
        </div>
      </section>

      <section className={styles.instagram} aria-label="Instagram">
        <div className={styles.instagramTop}>
          <a
            className={styles.instagramHandle}
            href="https://www.instagram.com/spiral.mstudio/"
            target="_blank"
            rel="noreferrer"
          >
            @SPIRAL.MSTUDIO
          </a>
        </div>

        <div className={styles.instagramGrid} aria-hidden>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={styles.instagramCell} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default BookNowModule;

