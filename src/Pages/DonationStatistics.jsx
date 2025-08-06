import React, { useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

import useAxiosSecure from '../Hooks/axiosSecure';
import { AuthContext } from '../Context/AuthContext';

// Triangle bar shape generator
const getPath = (x, y, width, height) => (
  `M${x},${y + height}
   C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
   C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
   Z`
);

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const DonationStatistics = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: statsData = [], isLoading } = useQuery({
    queryKey: ['donation-stats', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donations?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center mt-10">Loading Chart...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Donation Type Statistics</h2>

      <div className="bg-[#f0f7ff] p-6 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={statsData} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#8884d8" shape={<TriangleBar />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DonationStatistics;
