import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type SectionLink = {
  id: string;
  label: string;
};

@Component({
  selector: 'app-side-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './side-index.component.html',
  styleUrl: './side-index.component.css'
})
export class SideIndexComponent {
  @Input({ required: true }) public links: SectionLink[] = [];
  @Input({ required: true }) public isOpen = true;
  @Input({ required: true }) public activeSectionId = 'top';
  @Input() public closeOnNavigate = false;

  @Output() public readonly toggle = new EventEmitter<void>();

  protected onToggle(): void {
    this.toggle.emit();
  }

  protected onNavigate(): void {
    if (this.closeOnNavigate) {
      this.toggle.emit();
    }
  }
}
