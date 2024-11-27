import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from '../components/skeleton';

const meta = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    repeat: 1,
    width: '400px',
  },
};

export const Repeat2: Story = {
  args: {
    repeat: 2,
    width: '400px',
  },
};

export const Repeat3: Story = {
  args: {
    repeat: 3,
    width: '600px',
  },
};

export const RepeatHeight200: Story = {
  args: {
    repeat: 1,
    width: '600px',
    height: '200px',
  },
};

export const RepeatFullWidth: Story = {
  args: {
    repeat: 2,
    width: '100%',
    height: '100px',
  },
};
