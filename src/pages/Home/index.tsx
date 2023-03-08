import React, { useState } from 'react';
import { CloseCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  InputNumber,
  Row,
  Space,
  Steps,
} from 'antd';
import dayjs from 'dayjs';
import { useNavigate, useSearchParams } from 'react-router-dom';

import CityInput, { OptionType } from '../../components/CityInput';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchPararms, setSearchParams] = useSearchParams();
  const origin = searchPararms.get("origin") || "";
  const destination = searchPararms.getAll('destination') || [];
  const passengers = Number(searchPararms.get("passengers")) || "";
  const date = searchPararms.get("date") || "";
  const [destinationCount, setDestinationCount] = useState<number>(Math.max(destination.length, 1));
  const [form] = Form.useForm();

  const onAddDestination = () => {
    setDestinationCount((prevVal) => prevVal + 1);
  };

  const onRemoveDestination = (idx: number) => {
    const destinations = form.getFieldValue('destination');
    destinations.splice(idx, 1);
    form.setFieldValue('destination', destinations);
    setDestinationCount((prevVal) => prevVal - 1);
    setSearchParams({
      origin,
      destination: destinations.filter(
        (el: string | OptionType | undefined) => Boolean(el)
      ).map((el: string | OptionType) => {
        if (typeof el === "string") return el;

        return el.value;
      }),
      passengers: `${passengers}`,
      date,
    }, { replace: true });
  };

  const onValuesChange = (_: any, values: any) => {
    const newParams = Object.keys(values).reduce(
      (acc, cur) => {
        if (cur === 'destination') {
          return {
            ...acc,
            [cur]: values[cur].filter(
              (el: string | OptionType | undefined) => Boolean(el)
            ).map((el: string | OptionType) => {
              if (typeof el === "string") return el;

              return el.value;
            })
          }
        } else if (values[cur]) {
          return {
            ...acc,
            [cur]: cur !== 'origin' || typeof values[cur] === 'string' ? values[cur] : values[cur].value,
          }
        }

        return acc;
      },
      {}
    );

    setSearchParams(newParams, { replace: true });
  };

  const onFinish = () => {
    navigate({
      pathname: '/result',
      search: `?${searchPararms.toString()}`
    })
  };

  return (
    <Card className="app-card">
      <Form
        form={form}
        initialValues={{
          origin, destination, passengers,
          date: date ? dayjs(date) : ""
        }}
        layout="vertical"
        onValuesChange={onValuesChange}
        onFinish={onFinish}
      >
        <Row gutter={[24, 24]}>
          <Col span={24} md={16}>
            <Steps
              className="form-steps"
              direction="vertical"
              size="small"
              items={[
                {
                  description: (
                    <Space className="space-block city-input-row" size={16}>
                      <Form.Item
                        name="origin"
                        label="City of origin"
                        rules={[
                          {
                            required: true,
                            message: "You must choose the city of origin"
                          },
                          () => ({
                            validator(_, value) {
                              if (value && typeof value === "string") {
                                return Promise.reject(
                                  new Error("Invalid value provided")
                                );
                              }
          
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <CityInput />
                      </Form.Item>
                    </Space>
                  )
                },
                ...Array.from({ length: destinationCount }).map((_, idx) => ({
                  description: (
                    <Space className="space-block city-input-row" size={16}>
                      <Form.Item
                        name={['destination', idx]}
                        label="City of destination"
                        rules={[
                          {
                            required: true,
                            message: "You must choose the city of destination"
                          },
                          () => ({
                            validator(_, value) {
                              if (value && typeof value === "string") {
                                return Promise.reject(
                                  new Error("Invalid value provided")
                                );
                              }
          
                              return Promise.resolve();
                            },
                          }),
                        ]}
                      >
                        <CityInput />
                      </Form.Item>

                      {destinationCount > 1 && (
                        <CloseCircleOutlined onClick={() => onRemoveDestination(idx)} />
                      )}
                    </Space>
                  )
                }))
              ]}
            />

            <Button
              type="text"
              className="btn-add-destination"
              icon={<PlusCircleOutlined />}
              onClick={onAddDestination}
            >
              Add destination
            </Button>
          </Col>

          <Col span={24} md={8}>
            <Space wrap style={{ paddingLeft: 40 }}>
              <Form.Item
                name="passengers"
                label="Passengers"
                rules={[
                  { required: true, message: "Select passengers" },
                  { type: "number", min: 1, message: "Invalid value provided" }
                ]}
              >
                <InputNumber />
              </Form.Item>

              <Form.Item
                name="date"
                label="Date"
                rules={[
                  { required: true, message: "This field is required" },
                  () => ({
                    validator(_, value) {
                      if (value && dayjs(value).isBefore(dayjs())) {
                        return Promise.reject(
                          new Error("Invalid value provided")
                        );
                      }
  
                      return Promise.resolve();
                    },
                  }),
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Space>
          </Col>
        </Row>

        <Row justify="center">
          <Col>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </Card>
  );
}

export default Home;
