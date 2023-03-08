import React, { useEffect, useState } from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Space,
  Steps,
  Tag,
  Typography,
} from 'antd';
import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { calculateDistance } from '../../api';

const { Text } = Typography;

const SearchResults: React.FC = () => {
  const navigate = useNavigate();
  const [searchPararms] = useSearchParams();
  const [distances, setDistances] = useState<{
    routes: number[];
    total: number;
  } | undefined>();
  const [error, setError] = useState<string | undefined>();
  const origin = searchPararms.get("origin") || "";
  const destination = searchPararms.getAll("destination") || [];
  const passengers = Number(searchPararms.get("passengers")) || 0;
  const date = searchPararms.get("date") || "";

  useEffect(() => {
    calculateDistance(
      [
        origin,
        ...destination
      ]
    ).then((res: number[]) => {
      const total = res.reduce((acc, cur) => acc + cur, 0);

      setDistances({
        routes: res,
        total
      })
    }).catch((err) => {
      console.error(error);
      setError(err);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBack = () => navigate(-1);

  if (error) {
    return (
      <Card className="app-card has-error">
        <Text className="emphasized error-text">
          Oops! Something went wrong!
        </Text>

        <Button type="primary" onClick={onBack}>
          Back
        </Button>
      </Card>
    )
  }

  if (!distances) {
    return (
      <Card className="app-card has-error">
        <LoadingOutlined style={{ fontSize: 48 }} />
      </Card>
    )
  }

  return (
    <Card className="app-card">
      <Space className="space-block" direction="vertical" size={30} align="center">
        <Space direction="vertical" align="center">
          <Steps
            className="distance-steps"
            direction="vertical"
            size="small"
            items={
              [origin, ...destination].map((el, idx) => {
                if (idx < distances.routes.length) {
                  return {
                    title: el,
                    description: (
                      <Tag color="blue">
                        {(distances.routes[idx] / 1000).toFixed(2)} km
                      </Tag>
                    )
                  }
                }
                
                return { title: el };
              })
            }
          />

          <Text>
            <span className="emphasized">
              {(distances.total / 1000).toFixed(2)} km
            </span> is total distance
          </Text>
          <Text>
            <span className="emphasized">{passengers}</span> passengers
          </Text>
          <Text className="emphasized">
            {dayjs(date).format("MMM DD, YYYY")}
          </Text>
        </Space>

        <Button type="primary" onClick={onBack}>
          Back
        </Button>
      </Space>
    </Card>
  );
}

export default SearchResults;
