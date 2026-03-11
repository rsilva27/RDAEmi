import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { LucideAngularModule, CheckCircle2, Copy } from 'lucide-angular';

@Component({
  selector: 'app-code-block',
  imports: [LucideAngularModule],
  templateUrl: './code-block.html',
  styleUrl: './code-block.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeBlockComponent {
  readonly title = input.required<string>();
  readonly code = input.required<string>();

  protected readonly copied = signal(false);
  protected readonly CheckCircle2 = CheckCircle2;
  protected readonly Copy = Copy;

  protected copyToClipboard(): void {
    navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    setTimeout(() => this.copied.set(false), 2000);
  }
}
