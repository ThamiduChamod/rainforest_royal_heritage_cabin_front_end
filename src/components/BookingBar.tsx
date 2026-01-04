import React, { useEffect, useState } from "react";
import { Calendar, Users } from "lucide-react";
import { myBooking } from "../services/booking";

type BookingTime = {
  checkIn: string;
  checkOut: string;
};

const BookingBar = () => {

  const [time, setTime] = useState<BookingTime>({
    checkIn: "Loading...",
    checkOut: "Loading..."
  });

  useEffect(() => {
    getBookingTime();
  }, []);

  const formatDateTime = (iso: string) => {
    return new Date(iso).toLocaleString("en-LK", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });
  };

  const getBookingTime = async () => {
    try {
      const res = await myBooking();

      if (res.data.length > 0) {
        const booking = res.data[0];

        setTime({
          checkIn: formatDateTime(booking.checkIn),
          checkOut: formatDateTime(booking.checkOut)
        });
      }

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="relative top-20 m-20  z-30 w-full max-w-7xl mx-auto -mt-16 px-6">
      <div className="bg-[#111827]/60 backdrop-blur-xl border border-white/10 rounded-[35px] shadow-2xl p-4 lg:p-2">
        <div className="flex flex-col lg:flex-row items-center gap-2">

          {/* Check In */}
          <div className="w-full lg:flex-1">
            <div className="p-4 lg:p-6 rounded-[28px] hover:bg-white/5 transition">
              <div className="flex items-center gap-3 mb-1">
                <Calendar className="text-emerald-500" size={18} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Check In
                </span>
              </div>
              <p className="text-white font-bold ml-7">
                {time.checkIn}
              </p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-12 bg-white/10"></div>

          {/* Check Out */}
          <div className="w-full lg:flex-1">
            <div className="p-4 lg:p-6 rounded-[28px] hover:bg-white/5 transition">
              <div className="flex items-center gap-3 mb-1">
                <Calendar className="text-emerald-500" size={18} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Check Out
                </span>
              </div>
              <p className=" text-white font-bold ml-7">
                {time.checkOut}
              </p>
            </div>
          </div>

          <div className="hidden lg:block w-px h-12 bg-white/10"></div>

          {/* Guests */}
          {/* <div className="w-full lg:flex-1">
            <div className="p-4 lg:p-6 rounded-[28px] hover:bg-white/5 transition">
              <div className="flex items-center gap-3 mb-1">
                <Users className="text-emerald-500" size={18} />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[2px]">
                  Guests
                </span>
              </div>
              <p className="text-white font-bold ml-7">
                02 Adults, 01 Child
              </p>
            </div>
          </div> */}

        </div>
      </div>
    </div>
  );
};

export default BookingBar;
