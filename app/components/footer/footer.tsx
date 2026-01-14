'use client'
import { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    
    // Set initial time on client mount
    setTime(new Date());
    
    const interval = setInterval(() => {      setTime(new Date());
    }, 60000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (!time) {
    return <span>--:--:--</span>;
  }


  return (
    <span>
      Local Time (PKT): <span id="local-time">
        {time.toLocaleTimeString('en-US', { 
          timeZone: 'Asia/Karachi',
          hour: '2-digit',
          minute: '2-digit',        })}
      </span>
    </span>
  );
}

export function Footer() {
    return (
        <footer className="py-4 px-8 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
                <span>© {new Date().getFullYear()} Asif Raza — Full Stack Developer</span>
                <Clock />
            </div>
        </footer>
    )
}