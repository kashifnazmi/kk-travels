import React, { useState } from 'react';
import { X, Calendar, Users, Send, CheckCircle, Clock, MapPin, Compass } from 'lucide-react';
import { Destination, PackageCategory } from '../types';
import { DESTINATIONS } from '../data';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedDestinationId?: string;
}

export default function BookingModal({ isOpen, onClose, preSelectedDestinationId }: BookingModalProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [destinationId, setDestinationId] = useState(preSelectedDestinationId || DESTINATIONS[0].id);
  const [travelDate, setTravelDate] = useState('');
  const [guests, setGuests] = useState(2);
  const [duration, setDuration] = useState(6);
  const [packageType, setPackageType] = useState<PackageCategory>('Family');
  const [notes, setNotes] = useState('');
  
  // Submission Statuses: 'idle' | 'submitting' | 'success'
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [ticketId, setTicketId] = useState('');

  // Handle pre-selection prop syncs
  React.useEffect(() => {
    if (preSelectedDestinationId) {
      setDestinationId(preSelectedDestinationId);
      const dest = DESTINATIONS.find(d => d.id === preSelectedDestinationId);
      if (dest) {
        setPackageType(dest.category);
      }
    }
  }, [preSelectedDestinationId]);

  if (!isOpen) return null;

  const activeDestination = DESTINATIONS.find(d => d.id === destinationId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone || !travelDate) return;

    setStatus('submitting');
    
    // Simulate premium backend reservation registration
    setTimeout(() => {
      const generatedCode = `KK-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(10 + Math.random() * 89)}`;
      setTicketId(generatedCode);
      setStatus('success');
      
      // Save to local tour register for persistent lookup inside session if needed
      const currentBookings = JSON.parse(localStorage.getItem('kk_travels_bookings') || '[]');
      const newBooking = {
        ticketId: generatedCode,
        fullName,
        email,
        phone,
        destinationName: activeDestination?.title || 'Custom Tour Route',
        travelDate,
        guests,
        duration,
        packageType,
        notes,
        status: 'Pending',
        timestamp: new Date().toISOString()
      };
      currentBookings.push(newBooking);
      localStorage.setItem('kk_travels_bookings', JSON.stringify(currentBookings));

    }, 2000);
  };

  const handleReset = () => {
    setFullName('');
    setEmail('');
    setPhone('');
    setTravelDate('');
    setGuests(2);
    setDuration(6);
    setNotes('');
    setStatus('idle');
    onClose();
  };

  return (
    <div id="booking-modal-overlay" className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        id="booking-modal-container"
        className="relative bg-[#0F172A] border border-white/10 rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden transition-all duration-300 max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-950 to-slate-900 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500 rounded-xl text-slate-950">
              <Compass className="w-5 h-5 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-xl font-sans font-extrabold text-white tracking-tight">
                Secure Booking Inquiry
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Premium Concierge Support &bull; 0% Fee Booking Guarantee
              </p>
            </div>
          </div>
          <button
            id="close-booking-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-all cursor-pointer"
            aria-label="Close booking modal Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body with states */}
        <div className="p-6 overflow-y-auto grow dark-scrollbar">
          {status === 'idle' && (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Image Preview of active destination */}
              {activeDestination && (
                <div className="rounded-2xl overflow-hidden relative h-36 border border-white/5 shadow-md">
                  <img
                    src={activeDestination.image}
                    alt={activeDestination.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] font-mono uppercase bg-amber-500 text-slate-950 font-bold px-2 py-0.5 rounded-md self-start mb-1">
                      {activeDestination.category}
                    </span>
                    <h3 className="text-lg font-sans font-extrabold text-white leading-tight">
                      {activeDestination.title}
                    </h3>
                    <p className="text-xs text-slate-300 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500" /> {activeDestination.subtitle} &bull; <Clock className="w-3 h-3 text-amber-500 ml-1" /> {activeDestination.duration}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Destination Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="destination-select" className="text-xs font-sans font-semibold text-slate-300 uppercase tracking-wider block">
                    Choose Destination
                  </label>
                  <select
                    id="destination-select"
                    value={destinationId}
                    onChange={(e) => setDestinationId(e.target.value)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {DESTINATIONS.map((dest) => (
                      <option key={dest.id} value={dest.id}>
                        {dest.title} ({dest.subtitle})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Package Type Dropdown */}
                <div className="space-y-1.5">
                  <label htmlFor="package-category-select" className="text-xs font-sans font-semibold text-slate-300 uppercase tracking-wider block">
                    Travel Category
                  </label>
                  <select
                    id="package-category-select"
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value as PackageCategory)}
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Domestic">Domestic</option>
                    <option value="International">International</option>
                    <option value="Family">Family Pack</option>
                    <option value="Honeymoon">Honeymoon Special</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Religious">Religious</option>
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div className="space-y-4 pt-1 border-t border-white/5">
                <h4 className="text-sm font-sans font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Personal Contact Information
                </h4>
                
                <div className="space-y-3.5">
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="Your Full Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      required
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="WhatsApp Mobile Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Tour Logistics */}
              <div className="space-y-4 pt-1 border-t border-white/5">
                <h4 className="text-sm font-sans font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Tour Logistics & Accommodation
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="travel-date" className="text-[10px] uppercase font-sans font-bold text-slate-400">
                      Departure Date
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        required
                        id="travel-date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="guests-count" className="text-[10px] uppercase font-sans font-bold text-slate-400">
                      Total Guests (Pax)
                    </label>
                    <input
                      type="number"
                      id="guests-count"
                      min={1}
                      max={40}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="duration-days" className="text-[10px] uppercase font-sans font-bold text-slate-400">
                      Ideal Duration (Days)
                    </label>
                    <input
                      type="number"
                      id="duration-days"
                      min={1}
                      max={40}
                      value={duration}
                      onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Special Notes & Customization */}
              <div className="space-y-1.5">
                <label htmlFor="special-requests" className="text-xs font-sans font-semibold text-slate-300 uppercase tracking-wider block">
                  Add Customization & Tour Customization Notes
                </label>
                <textarea
                  id="special-requests"
                  rows={2}
                  placeholder="Tell us about food options (veg/non-veg), visa hurdles, hotel preferences, surprise events or senior citizens traveling along..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                id="submit-booking-inquiry-btn"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-amber-500 text-slate-950 font-sans font-extrabold rounded-2xl transition-all shadow-xl hover:shadow-blue-500/10 hover:from-blue-500 hover:to-amber-400 transform hover:-translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5 text-slate-950" />
                <span>Submit Secure Booking & Request Call</span>
              </button>
            </form>
          )}

          {status === 'submitting' && (
            <div id="booking-submitting-state" className="py-16 flex flex-col items-center justify-center space-y-4">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-4 border-slate-805/50 border-t-amber-500 animate-spin" />
              </div>
              <h3 className="text-xl font-sans font-extrabold text-white text-center">
                Registering Booking Inquiry...
              </h3>
              <p className="text-sm text-slate-400 text-center max-w-sm">
                Our active global routing script is allocating a regional destination director for your request. It takes just a second.
              </p>
            </div>
          )}

          {status === 'success' && (
            <div id="booking-success-state" className="py-10 text-center space-y-6">
              <div className="mx-auto w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-sans font-extrabold text-white">
                  Trip Request Registered!
                </h3>
                <p className="text-sm text-slate-400 max-w-md mx-auto">
                  Thank you, <span className="text-white font-semibold">{fullName}</span>! Your customized travel blueprint request has been compiled successfully.
                </p>
              </div>

              {/* ticket display */}
              <div className="bg-slate-950 border border-white/10 rounded-2xl p-5 max-w-md mx-auto">
                <div className="flex justify-between items-center text-left border-b border-white/5 pb-3">
                  <div>
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Trip Voucher Ticket</span>
                    <h4 className="text-lg font-mono font-bold text-amber-400 tracking-wider">
                      {ticketId}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-slate-500 uppercase">Assigned Planner</span>
                    <h4 className="text-xs font-sans font-bold text-white">
                      Rohan Sharma (Bali Specialist)
                    </h4>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 text-left">
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Destination</span>
                    <span className="text-sm text-white font-sans font-medium">
                      {activeDestination?.title || 'Custom Plan'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Travel Date</span>
                    <span className="text-sm text-white font-sans font-medium">
                      {travelDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Guests</span>
                    <span className="text-sm text-white font-sans font-medium">
                      {guests} Pax ({duration} Days)
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">Support Status</span>
                    <span className="text-xs font-sans font-bold bg-amber-500/10 text-amber-500 border border-amber-500/20 px-2 py-0.5 rounded-lg inline-block">
                      Callback Arranged
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm mx-auto">
                Our support team has logged your credentials. We will contact you shortly on your WhatsApp mobile <span className="text-white font-medium">{phone}</span> to finalize your customized tour itineraries.
              </p>

              <button
                id="success-booking-dismiss-btn"
                onClick={handleReset}
                className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-sans font-bold rounded-xl transition-all cursor-pointer"
              >
                Dismiss Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
