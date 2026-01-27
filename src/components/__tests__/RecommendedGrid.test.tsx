import { render, screen } from '@testing-library/react';
import RecommendedGrid from '../RecommendedGrid';
import type { StreamContent } from '../TrendingRow';

function makeItem(id: string): StreamContent {
  return {
    id,
    title: `Title ${id}`,
    streamer: 'HYPE',
    viewers: '123',
    game: 'Test Game',
    thumbnailUrl: '/window.svg',
    tags: ['tag1', 'tag2'],
    isLive: true,
  };
}

describe('RecommendedGrid', () => {
  it('renders a title and a grid of items', () => {
    const items = [makeItem('1'), makeItem('2'), makeItem('3')];

    render(
      <RecommendedGrid
        title="Recommended for You"
        items={items}
        onItemClick={() => {}}
      />
    );

    expect(screen.getByText('Recommended for You')).toBeInTheDocument();
    // Should render each content title
    items.forEach((i) => {
      expect(screen.getByText(i.title)).toBeInTheDocument();
    });
  });

  it('renders skeletons when loading', () => {
    render(
      <RecommendedGrid
        title="Results"
        items={[]}
        onItemClick={() => {}}
        loading
      />
    );

    // There should be multiple skeleton blocks
    const skeletons = screen.getAllByRole('generic', { hidden: true });
    expect(skeletons.length).toBeGreaterThan(0);
    expect(screen.getByText('Results')).toBeInTheDocument();
  });
});
