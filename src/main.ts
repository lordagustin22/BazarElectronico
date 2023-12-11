// Prueba para hacer un cambio en el commit
// Y luego testear de subir esto solo al branch "testing"
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
