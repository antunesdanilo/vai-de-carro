import type { Meta, StoryObj } from '@storybook/react';
import { Rating } from '../components/rating';

const meta = {
  title: 'Components/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Rating5: Story = {
  args: {
    rating: 5,
  },
};

export const Rating4: Story = {
  args: {
    rating: 4,
  },
};

export const Rating3: Story = {
  args: {
    rating: 3,
  },
};

export const Rating2: Story = {
  args: {
    rating: 2,
  },
};

export const Rating1: Story = {
  args: {
    rating: 1,
  },
};

export const Rating0: Story = {
  args: {
    rating: 0,
  },
};
