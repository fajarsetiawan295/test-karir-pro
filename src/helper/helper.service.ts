import { Injectable, NotFoundException} from '@nestjs/common';

@Injectable()
export class HelperService {

    async createResponseSuccess(message: string, error: string | null, data: any | null) {
        return { message, error, data, status: true};
    }

    async createResponseError(message: string, error: string | null) {
        throw new NotFoundException({ message, error, data: null, status: false});
    }
}
