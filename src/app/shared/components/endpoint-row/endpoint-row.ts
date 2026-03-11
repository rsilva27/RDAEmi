import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-endpoint-row',
  templateUrl: './endpoint-row.html',
  styleUrl: './endpoint-row.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EndpointRowComponent {
  readonly method = input.required<'POST' | 'GET'>();
  readonly path = input.required<string>();
  readonly description = input.required<string>();

  protected readonly methodClass = computed(() => {
    const colors: Record<string, string> = {
      POST: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
      GET: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    };
    return colors[this.method()] ?? '';
  });
}
