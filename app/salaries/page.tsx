'use client';

import { useState, useEffect } from 'react';

export const dynamic = 'force-dynamic';

export default function SalariesPage() {
  const [salaries, setSalaries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch salaries directly from the database via API
    fetch('/api/salaries')
      .then(res => res.json())
      .then(data => {
        setSalaries(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // ... rest of your salaries page code
}