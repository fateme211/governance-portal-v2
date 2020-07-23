import { useState, useEffect, useLayoutEffect } from 'react';
import { Text, Flex } from 'theme-ui';
import { Icon } from '@makerdao/dai-ui-icons';

import useInterval from '../lib/useInterval';

type Props = {
  endDate: string;
  endText: string;
};

const pad = (val: number): string => (val < 10 ? '0' + val : String(val));

const generateText = (endTime, endText) => {
  const now = Math.floor(new Date().getTime() / 1000);
  let timeLeft = endTime - now;
  if (timeLeft <= 0) return endText;

  const days = Math.floor(timeLeft / 3600 / 24);
  timeLeft -= days * 3600 * 24;
  const hours = Math.floor(timeLeft / 3600);
  timeLeft -= hours * 3600;
  if (days > 0) return `${days} days, ${hours} hours remaining`;

  const minutes = Math.floor(timeLeft / 60);
  timeLeft -= minutes * 60;
  return `${hours}:${pad(minutes)}:${pad(timeLeft)} remaining`;
};

const CountdownTimer = ({ endDate, endText }: Props) => {
  let [endTime, setEndTime] = useState<number>();
  let [text, setText] = useState('');

  if (!text) {
    endTime = Math.floor(new Date(endDate).getTime() / 1000);
    setEndTime(endTime);
    text = generateText(endTime, endText);
    setText(text);
  }

  useInterval(() => {
    const newText = generateText(endTime, endText);
    if (newText !== text) setText(newText);
  }, 1000);

  return (
    <Flex sx={{ alignItems: 'center' }}>
      <Icon mr="1" name="clock" size="3" sx={{ color: text !== endText ? 'primary' : 'secondary' }} />
      <Text
        sx={{ fontSize: 2, textTransform: 'uppercase', color: text !== endText ? 'mutedAlt' : 'secondary' }}
      >
        {text}
      </Text>
    </Flex>
  );
};

export default CountdownTimer;
