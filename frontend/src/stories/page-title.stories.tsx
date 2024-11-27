import type { Meta, StoryObj } from '@storybook/react';
import { PageTitle } from '../components/page-title';

const meta = {
  title: 'Components/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof PageTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Título da Página',
  },
};
