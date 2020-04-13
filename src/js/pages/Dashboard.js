import React, { Component } from 'react';
import { view } from 'react-easy-state';
import state from '../state/State';
import StatCard from '../generic/StatCard';
import config from '../../config';
import Loader from '../generic/Loader';
import { ResponsiveContainer, LineChart, Line, Label, XAxis, YAxis, Tooltip, Legend } from 'recharts';

// const data = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, ...];

class Dashboard extends Component {
    componentDidMount() {
        fetch(config.apiEndpoint + '/restricted/getstats', {
            method: 'post',
            headers: {
                Authorization: `Bearer ${state.sessionID}`,
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(res => {
            state.dashboardStats.numberOfUsers = res.numberOfUsers;
            state.dashboardStats.numberLoggedIn = res.numberLoggedIn;
            state.dashboardStats.userRegChart = res.userRegChart.reduce((acc, cur, idx) => {
                cur._id = idx;
                cur.total = idx + 1; // Not really sure how this works, but it does. Dont touch
                acc.push(cur);
                return acc;
            }, [])
                .sort((a, b) => b.createdAt - a.createdAt) // Sort by createdAt date
                // Another reducer to leave datestamp as just date without the time
                .reduce((acc, cur, index, src) => {
                    cur.createdAt = cur.createdAt.split('T')[0];
                    acc.push(cur);
                    index = Number(index);
                    if (index !== 0 && index !== src.length -1) { // Only perform from second iteration onwards, cant compare to previous with only 1 item
                        // compare current item createdAt to acc (previous) createdAt
                        if (cur.createdAt === acc[index - 1].createdAt) {
                            // If current item date = one before it in final array, delete final array one 
                            acc.shift();
                        }
                    }
                    return acc;
                }, []);
            console.log(state.dashboardStats.userRegChart);
        })
    }
    render() {
        return (
            <div className="dashboard">
                <h1>Dashboard</h1>
                <div className="dashstat-container">
                    {state.dashboardStats.numberOfUsers != null && state.dashboardStats.numberOfUsers.length < 0 ? <Loader relative /> : (
                        <StatCard
                            stat="Total Number of Users"
                            value={state.dashboardStats.numberOfUsers}
                        />
                    )}
                    {state.dashboardStats.numberLoggedIn != null && state.dashboardStats.numberLoggedIn.length < 0 ? <Loader relative /> : (
                        <StatCard
                            stat="Total Logged In"
                            value={state.dashboardStats.numberLoggedIn}
                        />
                    )}
                </div>
                {state.dashboardStats.userRegChart != null && state.dashboardStats.userRegChart.length < 0 ? <Loader relative /> : (
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart width={730} height={250} data={state.dashboardStats.userRegChart}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <XAxis label="Date Registered" dataKey="createdAt" />
                            <YAxis label={{ value: 'Number of Users', angle: -90, position: 'insideLeft' }} dataKey="total"/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" name="Total Users" dataKey="total" stroke="#BADA55" />
                        </LineChart>
                    </ResponsiveContainer>
                )}
                
            </div>
        );
    }
}

export default view(Dashboard);
